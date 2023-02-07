// @ts-nocheck
import htm from 'https://cdn.skypack.dev/htm';
import { h, render } from 'https://cdn.skypack.dev/preact';
import { useMemo, useState, useCallback } from 'https://cdn.skypack.dev/preact/hooks';

const html = htm.bind(h);

function Result({ id, page, type }) {
	const data = useMemo(
		() => `https://ga-beacon.atanas.info/api/analytics?account=${id}&page=${page}${type}`,
		[id, page, type]
	);

	if (id && page) {
		return html`
			<section>
				<p>${data}</p>

				<button onClick=${async () => await navigator.clipboard.writeText(data)}>copy</button>
			</section>
		`;
	}

	return null;
}

function App() {
	const types = ['default', 'flat', 'pixel'];

	const [id, setId] = useState('test');
	const [page, setPage] = useState('test');
	const [image, setImage] = useState(types[0]);

	const onSetId = useCallback(e => setId(e.target.value), [id, setId]);
	const onSetPage = useCallback(e => setPage(e.target.value), [id, setPage]);
	const onSetImage = useCallback(e => setImage(e.target.value), [id, setImage]);

	const imageType = useMemo(() => (image === 'flat' ? '&flat' : image === 'pixel' ? '&pixel' : ''), [image]);

	return html`
		<div>
			<label for="id">Google Analytics ID</label>

			<input type="text" id="id" value="${id}" onInput="${onSetId}" />
		</div>

		<div>
			<label for="page">Page to be captured</label>

			<input type="text" id="page" value="${page}" onInput="${onSetPage}" />
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
