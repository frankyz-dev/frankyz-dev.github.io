import{t as e}from"./rolldown-runtime.CbXtAM7H.js";import{t}from"./react.CyOsqXVf.js";var n=e((e=>{var t=Symbol.for(`react.transitional.element`);function n(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.jsx=n,e.jsxs=n})),r=e(((e,t)=>{t.exports=n()})),i=t(),a=r(),o=[`created`,`validated`,`paid`,`fulfilled`,`completed`];function s(){let[e,t]=(0,i.useState)(0),[n,r]=(0,i.useState)(!1),s=()=>{!n&&e<o.length-1&&t(e+1)},c=()=>{if(n){r(!1);return}e>0&&t(e-1)},l=()=>{e<=1&&r(!0)},u=()=>{t(0),r(!1)},d=n?`cancelled`:o[e];return(0,a.jsxs)(`div`,{className:`order-stepper`,children:[(0,a.jsxs)(`div`,{className:`steps`,role:`list`,"aria-label":`Order state stepper`,children:[o.map((t,r)=>(0,a.jsxs)(`div`,{role:`listitem`,className:`step${!n&&r<e?` done`:``}${!n&&r===e?` active`:``}${n?` dimmed`:``}`,children:[(0,a.jsx)(`span`,{className:`dot`,"aria-hidden":`true`,children:!n&&r<=e?`✓`:r+1}),(0,a.jsx)(`span`,{className:`name`,children:t})]},t)),n&&(0,a.jsxs)(`div`,{className:`step cancelled`,role:`listitem`,children:[(0,a.jsx)(`span`,{className:`dot`,"aria-hidden":`true`,children:`✕`}),(0,a.jsx)(`span`,{className:`name`,children:`cancelled`})]})]}),(0,a.jsxs)(`p`,{className:`status`,children:[`Current state: `,(0,a.jsx)(`code`,{children:d})]}),(0,a.jsxs)(`div`,{className:`controls`,children:[(0,a.jsx)(`button`,{type:`button`,onClick:c,disabled:e===0&&!n,children:`← Back`}),(0,a.jsx)(`button`,{type:`button`,onClick:s,disabled:n||e===o.length-1,children:`Advance →`}),(0,a.jsx)(`button`,{type:`button`,onClick:l,disabled:n||e>1,children:`Cancel`}),(0,a.jsx)(`button`,{type:`button`,onClick:u,children:`Reset`})]}),(0,a.jsx)(`style`,{children:`
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
			`})]})}export{s as default};