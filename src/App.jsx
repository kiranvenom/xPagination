import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
	const [users, setusers] = useState([]);
	const [page, setPage] = useState(1);

	const getUsers = async () => {
		try {
			let { data } = await axios.get(
				'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
			);
			setusers(data);
		} catch (error) {
			console.log(error);
			alert('failed to fetch data');
		}
	};

	const handleNext = () => {
		if (page === Math.ceil(users.length / 10)) return;
		setPage((prev) => prev + 1);
	};

	const handlePrev = () => {
		if (page === 1) return;
		setPage((prev) => prev - 1);
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<>
			<div>
				<h1 className='text-center my-4 text-2xl font-bold'>
					Employee Data Table
				</h1>
				<table className='w-[98vw] m-auto'>
					<thead className='bg-[#009879] text-white'>
						<tr>
							{users &&
								users.length > 0 &&
								Object.keys(users[0]).map((data, index) => (
									<th className='uppercase py-2' key={index}>
										{data}
									</th>
								))}
						</tr>
					</thead>
					<tbody>
						{users
							.slice((page - 1) * 10, page * 10)
							.map((user, index) => (
								<tr className='even:bg-gray-100' key={index}>
									{Object.values(user).map((info, i) => (
										<td
											className='text-center py-1 font-semmibold'
											key={i}>
											{info}
										</td>
									))}
								</tr>
							))}
					</tbody>
				</table>
				<div className='mt-24 flex justify-center'>
					<div className='flex items-center'>
						<button
							onClick={handlePrev}
							className='bg-[#009879] text-white m-2 px-4 rounded-md'>
							Previous
						</button>
						<h1 className='bg-[#009879] text-white m-2 w-[50px] h-[50px] flex justify-center items-center font-bold text-2xl rounded-lg'>
							{page}
						</h1>
						<button
							onClick={handleNext}
							className='bg-[#009879] text-white m-2 px-4 rounded-md'>
							Next
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
