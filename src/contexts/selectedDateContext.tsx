import React, { ReactNode } from 'react';
import moment, { Moment } from 'moment';

import { createContext, useState } from 'react';

export const SelectedDateContext = createContext<
  [Moment, React.Dispatch<React.SetStateAction<Moment>>]
>([moment(), () => {}]);
export const SelectedDateProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setCart] = useState<Moment>(moment());
  return (
    <SelectedDateContext.Provider value={[selectedDate, setCart]}>
      {children}
    </SelectedDateContext.Provider>
  );
};
