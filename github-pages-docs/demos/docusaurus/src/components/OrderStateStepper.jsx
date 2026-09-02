import React, {useState} from 'react';

/**
 * Interactive order-state stepper for the design docs.
 *
 * Walks through the Acme Order Service order lifecycle:
 * created → validated → paid → fulfilled → completed.
 *
 * SSR-safe: the initial render (index 0) is deterministic, so the
 * server-rendered HTML and the first client render match.
 */

const STATES = [
  {id: 'created', label: 'created', note: 'Order row written; 202 Accepted returned to the customer.'},
  {id: 'validated', label: 'validated', note: 'Validation passed; payment authorization queued.'},
  {id: 'paid', label: 'paid', note: 'Worker authorized payment; order.paid event published.'},
  {id: 'fulfilled', label: 'fulfilled', note: 'Inventory reserved; order.fulfilled event published.'},
  {id: 'completed', label: 'completed', note: 'Fulfillment confirmed; order is closed.'},
];

export default function OrderStateStepper() {
  const [index, setIndex] = useState(0);
  const state = STATES[index];

  return (
    <div
      className="order-state-stepper"
      style={{
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: '8px',
        padding: '1rem 1.25rem',
        margin: '1.5rem 0',
        background: 'var(--ifm-color-emphasis-50)',
      }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.4rem',
          marginBottom: '0.75rem',
        }}>
        {STATES.map((s, i) => (
          <React.Fragment key={s.id}>
            <span
              style={{
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                fontFamily: 'var(--ifm-font-monospace)',
                fontSize: '0.85rem',
                border: '1px solid var(--ifm-color-emphasis-400)',
                background:
                  i < index
                    ? 'var(--ifm-color-success-default)'
                    : i === index
                      ? 'var(--ifm-color-primary-default)'
                      : 'transparent',
                color: i <= index ? '#fff' : 'inherit',
                fontWeight: i === index ? 700 : 400,
              }}>
              {s.label}
            </span>
            {i < STATES.length - 1 && (
              <span aria-hidden="true" style={{opacity: 0.6}}>
                →
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
      <p style={{margin: '0 0 0.75rem'}}>
        <strong>Current state: {state.label}</strong> — {state.note}
      </p>
      <div style={{display: 'flex', gap: '0.5rem'}}>
        <button
          type="button"
          className="button button--secondary button--sm"
          onClick={() => setIndex((i) => Math.min(i + 1, STATES.length - 1))}
          disabled={index === STATES.length - 1}>
          Next state
        </button>
        <button
          type="button"
          className="button button--outline button--sm"
          onClick={() => setIndex(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}
