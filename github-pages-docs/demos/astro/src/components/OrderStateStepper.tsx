import { useState } from 'react';

// Interactive demo of the order lifecycle from the architecture doc:
// created -> validated -> paid -> fulfilled -> completed (+ cancelled)
const states = ['created', 'validated', 'paid', 'fulfilled', 'completed'];

export default function OrderStateStepper() {
	const [current, setCurrent] = useState(0);
	const [cancelled, setCancelled] = useState(false);

	const advance = () => {
		if (!cancelled && current < states.length - 1) setCurrent(current + 1);
	};
	const back = () => {
		if (cancelled) {
			setCancelled(false);
			return;
		}
		if (current > 0) setCurrent(current - 1);
	};
	const cancel = () => {
		if (current <= 1) setCancelled(true);
	};
	const reset = () => {
		setCurrent(0);
		setCancelled(false);
	};

	const label = cancelled ? 'cancelled' : states[current];

	return (
		<div className="order-stepper">
			<div className="steps" role="list" aria-label="Order state stepper">
				{states.map((s, i) => (
					<div
						key={s}
						role="listitem"
						className={`step${!cancelled && i < current ? ' done' : ''}${
							!cancelled && i === current ? ' active' : ''
						}${cancelled ? ' dimmed' : ''}`}
					>
						<span className="dot" aria-hidden="true">
							{!cancelled && i <= current ? '✓' : i + 1}
						</span>
						<span className="name">{s}</span>
					</div>
				))}
				{cancelled && (
					<div className="step cancelled" role="listitem">
						<span className="dot" aria-hidden="true">
							✕
						</span>
						<span className="name">cancelled</span>
					</div>
				)}
			</div>

			<p className="status">
				Current state: <code>{label}</code>
			</p>

			<div className="controls">
				<button type="button" onClick={back} disabled={current === 0 && !cancelled}>
					← Back
				</button>
				<button type="button" onClick={advance} disabled={cancelled || current === states.length - 1}>
					Advance →
				</button>
				<button type="button" onClick={cancel} disabled={cancelled || current > 1}>
					Cancel
				</button>
				<button type="button" onClick={reset}>
					Reset
				</button>
			</div>

			<style>{`
				.order-stepper {
					border: 1px solid var(--sl-color-gray-5);
					border-radius: 8px;
					padding: 1rem;
					margin: 1rem 0;
				}
				.order-stepper .steps {
					display: flex;
					flex-wrap: wrap;
					gap: 0.5rem 1rem;
					margin-bottom: 0.75rem;
				}
				.order-stepper .step {
					display: flex;
					align-items: center;
					gap: 0.4rem;
					font-size: 0.9rem;
					opacity: 0.9;
				}
				.order-stepper .step .dot {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					width: 1.4rem;
					height: 1.4rem;
					border-radius: 50%;
					border: 1px solid var(--sl-color-gray-4);
					font-size: 0.75rem;
				}
				.order-stepper .step.done .dot {
					background: var(--sl-color-green-low);
					border-color: var(--sl-color-green);
				}
				.order-stepper .step.active .dot {
					background: var(--sl-color-accent);
					border-color: var(--sl-color-accent);
					color: var(--sl-color-white);
				}
				.order-stepper .step.dimmed {
					opacity: 0.35;
				}
				.order-stepper .step.cancelled .dot {
					background: var(--sl-color-red-low);
					border-color: var(--sl-color-red);
				}
				.order-stepper .status {
					margin: 0 0 0.75rem;
				}
				.order-stepper .controls {
					display: flex;
					gap: 0.5rem;
					flex-wrap: wrap;
				}
				.order-stepper button {
					padding: 0.35rem 0.75rem;
					border-radius: 6px;
					border: 1px solid var(--sl-color-gray-4);
					background: var(--sl-color-gray-6);
					color: var(--sl-color-white);
					cursor: pointer;
				}
				.order-stepper button:disabled {
					opacity: 0.4;
					cursor: not-allowed;
				}
			`}</style>
		</div>
	);
}
