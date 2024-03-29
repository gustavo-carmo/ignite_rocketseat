import { Box, Text, Stack } from "@chakra-ui/react";
import { PaginationButton } from "./PaginationButton";

type PaginationProps = {
  totalCountOfRegisters: number;
  totalPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;


export function Pagination({ currentPage = 1, totalCountOfRegisters, totalPerPage = 10, onPageChange }: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / totalPerPage);
  const pageStart = ((currentPage - 1) * totalPerPage) + 1;
  const pageEnd = currentPage === lastPage ? totalCountOfRegisters : currentPage * totalPerPage;

  const pagesBefore = [...new Array(siblingsCount)].map((_, index) => {
    return currentPage + index - siblingsCount;
  }).filter(page => page > 0);

  const pagesAfter = [...new Array(siblingsCount)].map((_, index) => {
    return currentPage + index + 1;
  }).filter(page => page <= lastPage);


  return (
    <Stack direction={["column", "row"]} mt="8" justify="space-between" spacing="6" align="center">
      <Box>
        <Text as="strong">{pageStart}</Text> - <Text as="strong">{pageEnd}</Text> de{" "}
        <Text as="strong">{totalCountOfRegisters}</Text>
      </Box>
      <Stack direction="row" spacing="2">

        {currentPage - siblingsCount > 1 && (
          <>
            <PaginationButton onPageChange={onPageChange} number={1} />
            {currentPage - siblingsCount > 2 && (
              <Text color="gray.300" width="6" textAlign="center" alignSelf="flex-end">...</Text>
            )}
          </>
        )}

        {pagesBefore.map(page => (
          <PaginationButton key={page} onPageChange={onPageChange} number={page} />
        ))}

        <PaginationButton onPageChange={onPageChange} number={currentPage} isCurrentPage={true} />

        {pagesAfter.map(page => (
          <PaginationButton key={page} onPageChange={onPageChange} number={page} />
        ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + siblingsCount - 1 < lastPage && (
              <Text color="gray.300" width="6" textAlign="center" alignSelf="flex-end">...</Text>
            )}
            <PaginationButton onPageChange={onPageChange} number={lastPage} />
          </>
        )}

      </Stack>
    </Stack>
  );
}
