# Deploy a Release

**Status:** Active · **Owner:** Platform Team · **Last updated:** 2026-09-01

## Purpose

Every change to the Acme Order Service ships through the same deployment
pipeline: commit, CI, build image, deploy staging (10% canary), verify,
deploy prod. This SOP describes how to run a release through that
pipeline, how to watch each stage, and how to override the pipeline when
it fails — the override path referenced by the architecture doc.

## Scope

- **In scope:** deploying a release of the order service and its worker
  to staging and production.
- **Out of scope:** database migrations (run separately, ahead of the
  release they support), infrastructure changes, and the web client
  (shipped through the storefront pipeline).

## Prerequisites

- The change is merged to `main` through a reviewed pull request.
- CI is green on the merge commit.
- You have deploy permission for the `orders` namespace (Kubernetes) or
  the staging host (Docker).
- No other release or credential rotation is in flight.

## Procedure

1. **Confirm the release.** Note the commit SHA and the image tag that
   CI produced. The image tag is the commit SHA; the registry is
   `registry.acme.example/order-service`.
2. **Watch CI and the build.** Confirm the unit and integration test
   stages pass and the image is pushed to the registry.
3. **Deploy staging.** The pipeline deploys the image to staging as a
   10% canary. Watch the canary for at least 10 minutes.
4. **Run the smoke checks.** The verify stage runs health endpoint
   checks and a synthetic order round-trip against the canary.
5. **Deploy prod.** On a pass, the pipeline rolls the image out to
   production. Watch the rollout in the console.
6. **Verify.** Complete the post-deploy verification checklist below.
7. **Close out.** Post the release (commit SHA, image tag, time) in the
   #ops channel and mark the release ticket done.

## Deployment variants

The deploy stage applies the image differently depending on the target
environment. The two variants below are structurally identical; use the
one that matches your target.

=== "Kubernetes"

    Production runs the order service as a Deployment in the `orders`
    namespace. The pipeline updates the image tag and the cluster
    performs a rolling update with no downtime.

    1. Set the image on the Deployment:

       ```bash
       kubectl -n orders set image deployment/order-service \
         order-service=registry.acme.example/order-service:<tag>
       ```

    2. Watch the rollout:

       ```bash
       kubectl -n orders rollout status deployment/order-service
       ```

    3. Confirm the pods:

       ```bash
       kubectl -n orders get pods -l app=order-service -o wide
       ```

       *Watch for:* the rollout is complete when every new pod reports
       `Ready`; old pods terminate only after the new ones pass their
       readiness probes.

=== "Docker"

    Staging runs the order service as a Docker container on the staging
    host. The pipeline replaces the container; expect a brief gap (a few
    seconds) while the new container starts.

    1. Pull the target image:

       ```bash
       docker pull registry.acme.example/order-service:<tag>
       ```

    2. Stop the running container:

       ```bash
       docker stop order-service
       ```

    3. Start the new container:

       ```bash
       docker run -d --name order-service --restart unless-stopped \
         -p 8080:8080 registry.acme.example/order-service:<tag>
       ```

       *Watch for:* the new container logs `listening on :8080` before
       you proceed; the old container is removed only after the new one
       is up.

## Verification

After the rollout completes, work through the post-deploy checklist:

- [ ] All pods/containers report healthy in the console
- [ ] Health endpoint returns `200` on every replica
- [ ] A synthetic order round-trip completes (`created` → `completed`)
- [ ] Error rate is at baseline within 15 minutes
- [ ] p99 latency on `POST /orders` is within 10% of the pre-release
      baseline
- [ ] No new dead-letter queue entries since the rollout
- [ ] The release is recorded in the release log with commit SHA and
      image tag

## Rollback

The pipeline rolls back automatically when the verify stage fails: it
reverts to the last good image and re-queues the failed stage. Manual
rollback is needed when the failure is caught after the verify stage —
for example, a slow degradation in production.

!!! danger "Abort criteria"

    Abort the rollout and roll back immediately if any of the following
    are observed during the canary or production rollout:

    - Error rate on the gateway rises more than 2% above baseline
    - p99 latency on `POST /orders` doubles from baseline
    - The synthetic order round-trip fails twice in a row
    - Dead-letter queue depth grows for more than 5 minutes
    - Any replica fails its health check three times

To roll back manually:

1. Identify the last good image tag from the release log.
2. Re-run the deploy stage for that tag using the variant steps above
   (Kubernetes or Docker).
3. Watch the rollback rollout the same way you watched the original.
4. Complete the post-deploy verification checklist against the rolled-
   back version.
5. File a ticket describing the failure, with the time window, metrics,
   and logs, so the failed stage can be fixed and retried.
