// import React from 'react';
// import { Provider } from 'react-redux';
// import { render, fireEvent, screen } from '@testing-library/react';
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import Buttons from './buttons';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// describe('Buttons Component', () => {
//     let store: any;

//     beforeEach(() => {
//         // Reset the store before each test
//         store = mockStore({
//             // Mock the initial state according to your app's reducer
//         });
//         store.dispatch = jest.fn(); // Mock the dispatch function

//         render(
//             <Provider store={store}>
//                 <Buttons />
//             </Provider>,
//         );
//     });

//     test('renders both buttons', () => {
//         expect(screen.getByText('Previous')).toBeInTheDocument();
//         expect(screen.getByText('Next')).toBeInTheDocument();
//     });

//     test('Previous button is disabled on the first page', () => {
//         store = mockStore({
//             currentPageIndex: 0,
//             numberOfPages: 3,
//         });
//         render(
//             <Provider store={store}>
//                 <Buttons />
//             </Provider>,
//         );
//         expect(screen.getByText('Previous')).toBeDisabled();
//     });

//     test('Next button is disabled on the last page', () => {
//         store = mockStore({
//             currentPageIndex: 2, // Assuming the last page index is 2 (numberOfPages - 1)
//             numberOfPages: 3,
//         });
//         render(
//             <Provider store={store}>
//                 <Buttons />
//             </Provider>,
//         );
//         expect(screen.getByText('Next')).toBeDisabled();
//     });

//     test('Previous button is enabled unless it is the first page', () => {
//         store = mockStore({
//             currentPageIndex: 1,
//             numberOfPages: 3,
//         });
//         render(
//             <Provider store={store}>
//                 <Buttons />
//             </Provider>,
//         );
//         expect(screen.getByText('Previous')).not.toBeDisabled();
//     });

//     test('Next button is enabled unless it is the last page', () => {
//         store = mockStore({
//             currentPageIndex: 1,
//             numberOfPages: 3,
//         });
//         render(
//             <Provider store={store}>
//                 <Buttons />
//             </Provider>,
//         );
//         expect(screen.getByText('Next')).not.toBeDisabled();
//     });

//     test('dispatches nextPage when Next is clicked', () => {
//         fireEvent.click(screen.getByText('Next'));
//         expect(store.dispatch).toHaveBeenCalledWith(nextPage());
//     });

//     test('dispatches previousPage when Previous is clicked', () => {
//         fireEvent.click(screen.getByText('Previous'));
//         expect(store.dispatch).toHaveBeenCalledWith(previousPage());
//     });
// });
