import { nextPage, previousPage } from '@/store/actions/pageActions';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import Buttons from './buttons';
import React from 'react';

const mockStore = configureMockStore();

describe('Buttons Component', () => {
    const mockId = 'asdas-asdasd';
    let store: MockStoreEnhanced<unknown>;

    beforeEach(() => {
        store = mockStore({
            page: {
                pages: [{ _id: 'as' }, { _id: mockId }, { _id: '123' }],
                currentPage: { _id: mockId },
                numberOfPages: 3,
            },
        });
        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <Buttons />,
            </Provider>,
        );
    });

    test('renders both buttons', () => {
        expect(screen.getByText('Previous')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
    });

    test('Previous button is disabled on the first page', () => {
        cleanup();
        store = mockStore({
            page: {
                pages: [{ _id: mockId }, { _id: '123' }, { _id: '1223' }],
                currentPage: { _id: mockId },
                numberOfPages: 3,
            },
        });
        render(
            <Provider store={store}>
                <Buttons />
            </Provider>,
        );
        expect(screen.getByText('Previous')).toBeDisabled();
        expect(screen.getByText('Next')).toBeEnabled();
    });

    test('Next button is disabled on the last page', () => {
        cleanup();
        store = mockStore({
            page: {
                pages: [{ _id: 'as' }, { _id: '123' }, { _id: mockId }],
                currentPage: { _id: mockId },
                numberOfPages: 3,
            },
        });
        render(
            <Provider store={store}>
                <Buttons />
            </Provider>,
        );
        expect(screen.getByText('Next')).toBeDisabled();
        expect(screen.getByText('Previous')).toBeEnabled();
    });

    test('Previous button is enabled unless it is the first page', () => {
        cleanup();
        store = mockStore({
            page: {
                pages: [{ _id: 'as' }, { _id: mockId }, { _id: 'asdsd' }],
                currentPage: { _id: mockId },
                numberOfPages: 3,
            },
        });
        render(
            <Provider store={store}>
                <Buttons />
            </Provider>,
        );
        expect(screen.getByText('Previous')).toBeEnabled();
        expect(screen.getByText('Next')).toBeEnabled();
    });

    test('dispatches nextPage when Next is clicked', () => {
        fireEvent.click(screen.getByText('Next'));
        expect(store.dispatch).toHaveBeenCalledWith(nextPage());
    });

    test('dispatches previousPage when Previous is clicked', () => {
        fireEvent.click(screen.getByText('Previous'));
        expect(store.dispatch).toHaveBeenCalledWith(previousPage());
    });
});
