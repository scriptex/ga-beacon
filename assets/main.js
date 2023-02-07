// @ts-nocheck
import htm from 'https://cdn.skypack.dev/htm';
import { h, render } from 'https://cdn.skypack.dev/preact';
import { useRef, useMemo, useState, useEffect, useCallback } from 'https://cdn.skypack.dev/preact/hooks';

const html = htm.bind(h);

function Result({ id, page, type }) {
	const timeout = useRef(null);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		return () => {
			clearTimeout(timeout.current);
		};
	}, []);

	const data = useMemo(
		() => `https://ga-beacon.atanas.info/api/analytics?account=${id}&page=${page}${type}`,
		[id, page, type]
	);

	const onCopy = useCallback(async () => {
		await navigator.clipboard.writeText(data);

		setCopied(true);

		timeout.current = setTimeout(() => {
			setCopied(false);
		}, 1000);
	});

	if (id && page) {
		return html`
			<section>
				<p>${data}</p>

				<button onClick=${onCopy}>copy <span class=${copied ? 'visible' : undefined}>Copied!</span></button>
			</section>
		`;
	}

	return null;
}

function App() {
	const types = ['default', 'flat', 'pixel'];

	const [id, setId] = useState('');
	const [page, setPage] = useState('');
	const [image, setImage] = useState(types[0]);

	const onSetId = useCallback(e => setId(e.target.value), [id, setId]);
	const onSetPage = useCallback(e => setPage(e.target.value), [id, setPage]);
	const onSetImage = useCallback(e => setImage(e.target.value), [id, setImage]);

	const imageType = useMemo(() => (image === 'flat' ? '&flat' : image === 'pixel' ? '&pixel' : ''), [image]);

	return html`
		<div>
			<label for="id">Google Analytics ID</label>

			<input id="id" type="text" value="${id}" onInput="${onSetId}" placeholder="UA-83446952-1" />
		</div>

		<div>
			<label for="page">Page to be captured</label>

			<input
				id="page"
				type="text"
				value="${page}"
				onInput="${onSetPage}"
				placeholder="github.com/scriptex/ga-beacon"
			/>
		</div>

		<div>
			<label>Image type</label>

			<ul>
				${types.map(
					(type, index) => html`
						<li key=${type}>
							<label for="image-type-${index}">${type}</label>

							<input
								type="radio"
								id="image-type-${index}"
								value=${type}
								onInput="${onSetImage}"
								checked=${image === type}
							/>
						</li>
					`
				)}
			</ul>
		</div>

		<${Result} id=${id} page=${page} type=${imageType} />
	`;
}

render(html`<${App} />`, document.getElementById('app'));
