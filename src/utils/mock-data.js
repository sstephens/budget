/**
 * Simple data structure for mockup data and testing
 */
const mockData = {
	transaction: {
		data: [
			{
				id: 1,
				title: "Sinclair Station",
				category: "Fuel",
				amount: 45.93,
				business: true,
				notes: "Trip to Moab"
			},
			{
				id: 2,
				title: "Wal-Mart",
				category: "Food and Groceries",
				amount: 215.56,
				business: false,
				notes: "This is a really long description for testing the line wrap\nin the transactions list.\n\nThis is a really long description for testing\nthe line wrap in the transactions list."
			},
			{
				id: 3,
				title: "Maverick",
				category: "Fuel",
				amount: 35.63,
				business: false,
				notes: ""
			},
			{
				id: 4,
				title: "Cafe Rio",
				category: "Food and Groceries",
				amount: 25.33,
				business: true,
				notes: "Dinner with Bob"
			},
			{
				id: 5,
				title: "Sporting Goods Store",
				category: "Shopping",
				amount: 55.93,
				business: false,
				notes: ""
			},
			{
				id: 6,
				title: "SunRiver Golf Club",
				category: "Entertainment",
				amount: 65.00,
				business: true,
				notes: "Work Meeting"
			}
		],
		totalRows: 6
	}
};

export default mockData;

