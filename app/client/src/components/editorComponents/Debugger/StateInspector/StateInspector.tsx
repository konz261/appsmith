import React, { useState } from "react";
import ReactJson from "react-json-view";
import {
  Flex,
  List,
  type ListItemProps,
  SearchInput,
  Text,
} from "@appsmith/ads";
import { filterEntityGroupsBySearchTerm } from "IDE/utils";
import { useStateInspectorItems } from "./hooks";
import * as Styled from "./styles";

export const reactJsonProps = {
  name: null,
  enableClipboard: false,
  displayDataTypes: false,
  displayArrayKey: true,
  quotesOnKeys: false,
  style: {
    fontSize: "12px",
  },
  collapsed: 1,
  indentWidth: 2,
  collapseStringsAfterLength: 30,
};

export const StateInspector = () => {
  const [selectedItem, items, selectedItemCode] = useStateInspectorItems();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItemGroups = filterEntityGroupsBySearchTerm<
    { group: string },
    ListItemProps
  >(searchTerm, items);

  return (
    <Flex h="calc(100% - 40px)" overflow="hidden" w="100%">
      <Flex
        borderRight="1px solid var(--ads-v2-color-border)"
        flexDirection="column"
        h="100%"
        overflowY="hidden"
        w="400px"
      >
        <Flex p="spaces-3">
          <SearchInput
            onChange={setSearchTerm}
            placeholder="Search entities"
            value={searchTerm}
          />
        </Flex>
        <Flex
          flexDirection="column"
          gap="spaces-3"
          overflowY="auto"
          pl="spaces-3"
          pr="spaces-3"
        >
          {filteredItemGroups.map((item) => (
            <Styled.Group
              flexDirection="column"
              gap="spaces-2"
              key={item.group}
            >
              <Styled.GroupName
                className="overflow-hidden overflow-ellipsis whitespace-nowrap flex-shrink-0"
                kind="body-s"
              >
                {item.group}
              </Styled.GroupName>
              <List items={item.items} />
            </Styled.Group>
          ))}
        </Flex>
      </Flex>
      {selectedItem ? (
        <Flex
          className="mp-mask"
          data-testid="t--selected-entity-details"
          flex="1"
          flexDirection="column"
          overflowY="hidden"
        >
          <Styled.SelectedItem
            alignItems="center"
            flexDirection="row"
            gap="spaces-2"
            p="spaces-3"
          >
            {selectedItem.icon}
            <Text kind="body-m">{selectedItem.title}</Text>
          </Styled.SelectedItem>
          <Flex overflowY="auto" px="spaces-3">
            <ReactJson src={selectedItemCode} {...reactJsonProps} />
          </Flex>
        </Flex>
      ) : null}
    </Flex>
  );
};
