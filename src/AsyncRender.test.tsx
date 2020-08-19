import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';

import { AsyncRender } from './AsyncRender';

jest.useFakeTimers();

describe('AsyncRender', () => {
  it('should render the children if we go through the timeout and loading is true', async () => {
    const loading = true;
    render(<AsyncRender loading={loading}>hello bro</AsyncRender>);

    act(() => jest.runAllTimers());

    await waitFor(() =>
      expect(screen.getByText('hello bro')).toBeInTheDocument()
    );
    expect(screen.getByText('hello bro')).toBeInTheDocument();
  });

  it('should render the children if we go through the custom timeout', async () => {
    const loading = true;
    render(
      <AsyncRender loading={loading} timeout={4000}>
        hello bro
      </AsyncRender>
    );

    act(() => jest.advanceTimersByTime(4000));

    await waitFor(() =>
      expect(screen.getByText('hello bro')).toBeInTheDocument()
    );
    expect(screen.getByText('hello bro')).toBeInTheDocument();
  });

  it('should not render the children if we go through timeout but loading false', () => {
    const loading = false;
    render(<AsyncRender loading={loading}>hello bro</AsyncRender>);

    jest.runAllTimers();
    expect(screen.queryByText('hello bro')).not.toBeInTheDocument();
  });

  it("should not render the children if we don't pass the timeout", () => {
    const loading = true;
    render(<AsyncRender loading={loading}>hello bro</AsyncRender>);

    jest.advanceTimersByTime(1000);
    expect(screen.queryByText('hello bro')).not.toBeInTheDocument();
  });
});
