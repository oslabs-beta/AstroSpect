// exports reusable types

export type CurrentComp = {
  client: string;
  props: Record<string, any>;
};

export type IslandData = {
  [k: string]: CurrentComp;
};

export type HandleToggle = (
  event: React.SyntheticEvent<Element, Event>,
  nodeIds: string[]
) => void;

export type HandleClick = (
  event: React.SyntheticEvent<Element, Event>,
  id: string
) => void;

export type HandleExpandClick = () => void;

export type AddIslandData = (astroIsland: CurrentComp, id: string) => void;

export type AddId = (id: string) => void;

export type ComponentViewProps = {
  componentData: JSX.Element[];
  handleToggle: HandleToggle;
  expanded: string[];
  handleClick: HandleClick;
};

export type ElementViewProps = {
  handleClick: HandleClick;
  expanded: string[];
  handleToggle: HandleToggle;
  elementData: JSX.Element[];
};

export type SearchBarProps = {
  handleExpandClick: HandleExpandClick;
  expanded: string[];
};

export type PanelProps = {
  html: Document;
  handleClick: HandleClick;
  addIslandData: AddIslandData;
  addId: AddId;
  idArray: string[];
};

export type SidePaneProps = {
  currentComp: CurrentComp | null;
};
