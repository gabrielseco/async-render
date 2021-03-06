import React from 'react';

export const AsyncRender = ({
  loading,
  children,
  timeout = 2000
}: {
  loading: boolean;
  children: React.ReactNode;
  timeout?: number;
}): JSX.Element | null => {
  const [isRender, setRender] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  React.useEffect(() => {
    if (loading) {
      timeoutRef.current = setTimeout(() => {
        setRender(true);
      }, timeout);
    }

    if (!loading) {
      setRender(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current as NodeJS.Timeout);
      }
    }
  }, [loading, timeout]);

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current as NodeJS.Timeout);
    };
  }, []);

  if (isRender) {
    return children as React.ReactElement;
  }

  return null;
};
