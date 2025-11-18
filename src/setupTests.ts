import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure Testing Library to use data-cy instead of data-testid
configure({ testIdAttribute: 'data-cy' });
