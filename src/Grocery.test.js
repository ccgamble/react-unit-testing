import React from 'react';
import { shallow, mount } from 'enzyme';
import Grocery from './Grocery';
import AddGrocery from './AddGrocery'

describe('Grocery', () => {

	it('renders the name of the grocery in <h3> tags', () => {
		const wrapper = shallow(<Grocery name="Bananas" />);
		const title = <h3>Bananas</h3>;

		expect(wrapper.contains(title)).toEqual(true);
	});

	it('has a class of .Grocery', () => {
		const wrapper = shallow(<Grocery name="Bananas" />);

		expect(wrapper.is('.Grocery')).toEqual(true);
	});

	it('should have a className of "starred" if it is starred', () => {
		const wrapper = shallow(
			<Grocery name="Bananas" starred={true} />
		);

		expect(wrapper.is('.starred')).toEqual(true);
	});

	it('should not have a className of "starred" if it is not starred', () => {
		const wrapper = shallow(
			<Grocery name="Bananas" starred={false} />
		);

		expect(wrapper.is('.starred')).toEqual(false);
	});

	it('should have a className of "purchased" if it is purchased', () => {
		const wrapper = shallow(
			<Grocery name="Bananas" purchased={true} />
		);

		expect(wrapper.is('.purchased')).toEqual(true);
	});

	it('should not have a className of "purchased" if it is not purchased', () => {
		const wrapper = shallow(
			<Grocery name="Bananas" purchased={false} />
		);

		expect(wrapper.is('.purchased')).toEqual(false);
	});

	it('should have a p.Grocery-quantity element if a quantity is passed as a prop', () => {
		const wrapper = shallow(
			<Grocery name="Bananas" quantity={'17 bunches'} />
		);

		expect(wrapper.find('.Grocery-quantity').length).toEqual(1);
	});

	it('should not have a p.Grocery-quantity element if a quantity is not passed as a prop', () => {
		const wrapper = shallow(
			<Grocery name="Bananas" />
		);

		expect(wrapper.find('.Grocery-quantity').length).toEqual(0);
	});

	it('should have a p.Grocery-notes element if notes are passed as a prop', () => {
		const wrapper = shallow(
			<Grocery name="Bananas" notes={'food!'} />
		);

		expect(wrapper.find('.Grocery-notes').length).toEqual(1);
	});

	it('should not have a p.Grocery-notes element if notes are not passed as a prop', () => {
		const wrapper = shallow(
			<Grocery name="Bananas" />
		);

		expect(wrapper.find('.Grocery-notes').length).toEqual(0);
	});

	it('should pass in the correct quanity prop', () => {
		const wrapper = shallow(
			<Grocery name="Bananas" quantity={'17 bunches'} />
		);

		expect(wrapper.find('.Grocery-quantity').text()).toEqual('Quantity: 17 bunches');
	});

	it('should pass in the correct notes prop', () => {
		const wrapper = shallow(
			<Grocery name="Bananas" notes={'Bananas!!'} />
		);

		expect(wrapper.find('.Grocery-notes').text()).toEqual('Notes: Bananas!!');
	});
});

describe('.Grocery-purchase button', () => {

	it('should have a text of "Purchase" if purchased is false', () => {
		const wrapper = shallow(
			<Grocery name="Bananas" purchased={undefined} />
		);

		expect(wrapper.find('.Grocery-purchase').text()).toEqual('Purchase');
	});

	it('should have a text of "Unpurchase" if purchased is true', () => {
		const wrapper = shallow(
			<Grocery name="Bananas" purchased={true} />
		);

		expect(wrapper.find('.Grocery-purchase').text()).toEqual('Unpurchase');
	});

	it('should call the onPurchase prop when clicked', () => {
		const onPurchaseMock = jest.fn();

		const wrapper = mount(
			<Grocery
				name="Bananas"
				purchased={true}
				onPurchase={onPurchaseMock}
			/>
		);

		wrapper.find('.Grocery-purchase').simulate('click');

		expect(onPurchaseMock).toBeCalled();
	});
});

describe('.Grocery-star button', () => {

	it('should have a text of "Star" if purchased is false', () => {
		const wrapper = shallow(
			<Grocery name="Bananas" starred={undefined} />
		);

		expect(wrapper.find('.Grocery-star').text()).toEqual('Star');
	});

	it('should have a text of "Star" if purchased is false', () => {
		const wrapper = shallow(
			<Grocery name="Bananas" starred={true} />
		);

		expect(wrapper.find('.Grocery-star').text()).toEqual('Unstar');
	});

	it('should call the onStar prop when clicked', () => {
		const onStarMock = jest.fn();

		const wrapper = mount(
			<Grocery
				name="Bananas"
				starred={true}
				onStar={onStarMock}
			/>
		);

		wrapper.find('.Grocery-star').simulate('click');

		expect(onStarMock).toBeCalled();
	});
});

describe('.Remove button', () => {
	it('should call the onDelete prop when clicked', () => {
		const onDeleteMock = jest.fn();

		const wrapper = mount(
			<Grocery
				name="Bananas"
				onDelete={onDeleteMock}
			/>
		);

		wrapper.find('.Remove').simulate('click');

		expect(onDeleteMock).toBeCalled();
	})
});

describe('list of groceries', () => {
	it('should show the list of groceries added', () => {
		const wrapper=mount(
			<AddGrocery groceries={[
				{ id: 1, name: "Bananas"},
				{ id: 2, name: "Apples"},
				{ id: 3, name: "Oranges"}
			]} />
		);

		expect(wrapper.find('.Grocery').length).toEqual(3)
	})
	it('should have a "Clear Groceries" button that is disabled when there are no groceries', ()=> {
		const wrapper=shallow(
			<AddGrocery/>
		);

		expect(wrapper.find('.Grocery-clear-btn').prop('disabled')).toEqual(true)
	});

	it('should have a "Clear Groceries" button that is enabled when there are groceries', ()=> {
		const wrapper=shallow(
			<AddGrocery groceries={[
				{ id: 1, name: "Bananas"}
			]}/>
		);

		expect(wrapper.find('.Grocery-clear-btn').prop('disabled')).toEqual(false)
	})

	it('should call the onClearGroceries prop when clicked', () => {
		const onClearGroceriesMock = jest.fn();

		const wrapper = mount(
			<AddGrocery
				groceries={[ { id: 1, name: "Bananas"} ]}
				onClearGroceries={onClearGroceriesMock}
			/>
		);

		wrapper.find('.Grocery-clear-btn').simulate('click');

		expect(onClearGroceriesMock).toBeCalled();
	});

	it('should return the number of groceries added with the counter', () => {
		const wrapper=mount(
			<AddGrocery groceries={[
				{ id: 1, name: "Bananas"},
				{ id: 2, name: "Apples"},
				{ id: 3, name: "Oranges"}
			]} />
		);

		expect(wrapper.find('.Grocery-list-counter').text()).toEqual('Number of items: 3')
	})
});
