/** @format */
import { Card, Button, Space, Input, message, List, Checkbox } from 'antd';
import './App.css';
import { useEffect, useState } from 'react';
import { TitleComponent } from './components';
import { Add, Edit, Save2, Trash } from 'iconsax-react';

function App() {
	const [content, setContent] = useState('');
	const [tasks, setTasks] = useState([]);
	const [task, setTask] = useState();

	const handleAddNewTask = () => {
		if (!content) {
			message.error('What do you do?');
		}

		const data = {
			content,
			createdAt: Date.now(),
			updatedAt: Date.now(),
			createdBy: 'me',
			isCompleted: false,
		};

		setTasks([...tasks, data]);

		setContent('');
	};

	const handleRenderDateTime = (num) => {
		const date = new Date(num);

		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
	};

	const toggleTask = (index) => {
		const items = [...tasks];

		items[index].isCompleted = true;

		setTasks(items);
	};

	const handleRemoveTask = (index) => {
		const items = [...tasks];
		items.splice(index, 1);

		setTasks(items);
	};

	const handleSaveChangeTask = () => {
		const index = tasks.findIndex(
			(element) => element.content === task.content
		);

		if (index) {
			const newTask = {
				...task,
				content,
			};

			const items = [...tasks];

			items[index] = newTask;

			setTasks(items);

			setTask(undefined);
			setContent('');
		}
	};

	return (
		<div className='container mt-4'>
			<div className='col col-lg-8 offset-lg-2'>
				<Card
					title='Todo list'
					extra={
						<Space>
							<Input
								placeholder='Add new toto'
								value={content}
								onChange={(val) => setContent(val.target.value)}
								maxLength={100}
								size='large'
								onPressEnter={handleAddNewTask}
							/>
							<Button
								onClick={() =>
									task ? handleSaveChangeTask() : handleAddNewTask()
								}
								size='large'
								icon={
									task ? (
										<Save2 color='white' size={22} />
									) : (
										<Add color='white' size={22} />
									)
								}
								type='primary'
							/>
						</Space>
					}>
					<List
						dataSource={tasks}
						itemLayout='vertical'
						renderItem={(item, index) => (
							<List.Item
								key={`task${index}`}
								extra={[
									<Button
										disabled={item.isCompleted}
										key={`btnEdit`}
										icon={<Edit size={22} color='blue' variant='Bold' />}
										onClick={() => {
											setTask(item);
											setContent(item.content);
										}}
										type='text'
									/>,
									<Button
										key={`btnDelete`}
										icon={<Trash size={22} color='red' variant='Bold' />}
										onClick={() => handleRemoveTask(index)}
										type='text'
									/>,
								]}>
								<List.Item.Meta
									title={
										<Checkbox
											disabled={item.isCompleted}
											checked={item.isCompleted}
											onChange={() => toggleTask(index)}
											style={{
												color: item.isCompleted ? '#e0e0e0' : '#212121',
											}}>
											{item.content}
										</Checkbox>
									}
									description={`${item.createdBy.toUpperCase()} - ${handleRenderDateTime(
										item.createdAt
									)}`}
								/>
							</List.Item>
						)}
					/>
				</Card>
			</div>
		</div>
	);
}

export default App;
