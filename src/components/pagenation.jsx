import React from 'react';
import { Pagination, Stack } from '@mui/material';

export default function PaginationRounded() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} variant="outlined" shape="rounded" />
    </Stack>
  );
}
