/** @format */

import { Button } from 'antd';
import React from 'react';

function TitleComponent(props) {
	const { text, color, size, weight, onChangeName, isShow } = props;

	const newName = 'MindX school';

	return (
		<div>
			<h1
				className='title'
				style={{
					color: color ?? 'coral',
					fontSize: size ?? 18,
					fontWeight: weight ?? 'bold',
				}}>
				{text}
			</h1>
			{isShow && (
				<Button onClick={() => onChangeName(newName)}>Change name</Button>
			)}
		</div>
	);
}

export default TitleComponent;
