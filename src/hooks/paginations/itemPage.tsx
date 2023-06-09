import { usePagination } from '@ajna/pagination';
import { Box, ChakraProvider, Flex, Stack } from '@chakra-ui/react';

import { PaginationBottom } from './paginationBottom';

interface ItemPageProps {
  pageItems: any;
  CustomPage: any;
}

function ItemPage({ pageItems, CustomPage }: ItemPageProps): JSX.Element {
  // states
  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  } = usePagination({
    total: pageItems.length,
    limits: {
      outer: 2,
      inner: 2,
    },
    initialState: {
      pageSize: 10,
      isDisabled: false,
      currentPage: 1,
    },
  });

  return (
    <Flex className="flex-col flex-1">
      <ChakraProvider>
        <Box borderWidth="1px" borderRadius="lg" p="2">
          <Stack>
            {pageItems !== undefined &&
              Array.isArray(pageItems) &&
              pageItems
                .slice(offset, offset + pageSize)
                .map((item: any, index: number) => (
                  <CustomPage
                    key={index + '_' + currentPage}
                    pageItem={{ item }}></CustomPage>
                ))}
            {pagesCount > 1 && (
              <PaginationBottom
                pages={pages}
                pagesCount={pagesCount}
                currentPage={currentPage}
                onPageChanged={setCurrentPage}
              />
            )}
          </Stack>
        </Box>
      </ChakraProvider>
    </Flex>
  );
}

export default ItemPage;
