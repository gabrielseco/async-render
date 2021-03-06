import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';

import { AsyncRender } from './AsyncRender';

describe('AsyncRender', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render the children if we go through the timeout and loading is true', async () => {
    const loading = true;
    render(<AsyncRender loading={loading}>hello bro</AsyncRender>);

    act(() => {
      jest.runAllTimers();
    });

    expect(await screen.findByText('hello bro')).toBeInTheDocument();
  });

  it('should render the children if we go through the custom timeout', async () => {
    const loading = true;
    render(
      <AsyncRender loading={loading} timeout={4000}>
        hello bro
      </AsyncRender>
    );

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(await screen.findByText('hello bro')).toBeInTheDocument();
  });

  it('should not render the children if we go through timeout but loading false', async () => {
    const loading = false;
    render(<AsyncRender loading={loading}>hello bro</AsyncRender>);

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.queryByText('hello bro')).not.toBeInTheDocument();
  });

  it("should not render the children if we don't pass the timeout", async () => {
    const loading = true;
    render(<AsyncRender loading={loading}>hello bro</AsyncRender>);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(await screen.queryByText('hello bro')).not.toBeInTheDocument();
  });

  it('should cancel the async render if the loading changes', async () => {
    const Component = () => {
      const [loading, setLoading] = React.useState(true);
      return (
        <React.Fragment>
          <AsyncRender loading={loading}>hello bro</AsyncRender>
          <button onClick={() => setLoading(false)}>click me</button>
        </React.Fragment>
      );
    };
    render(<Component />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(await screen.queryByText('hello bro')).toBeInTheDocument();

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(await screen.queryByText('hello bro')).not.toBeInTheDocument();
  });

  it('should cancel the async render in the middle of the timeout', async () => {
    const Component = () => {
      const [loading, setLoading] = React.useState(true);
      return (
        <React.Fragment>
          <AsyncRender loading={loading}>hello bro</AsyncRender>
          <button onClick={() => setLoading(false)}>click me</button>
        </React.Fragment>
      );
    };
    render(<Component />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(await screen.queryByText('hello bro')).not.toBeInTheDocument();

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(await screen.queryByText('hello bro')).not.toBeInTheDocument();
  });
});
