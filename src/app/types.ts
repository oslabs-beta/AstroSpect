// exports reusable types

export type CurrentComp = {
  client: string;
  props: {};
};

export type IslandData = {
  [k: string]: CurrentComp;
};

type HandleToggle = (
  event: React.MouseEvent<Element, MouseEvent>,
  nodeIds: string[]
) => void;

type HandleClick = (
  event: React.MouseEvent<Element, MouseEvent>,
  nodeIds: string
) => void;

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
  handleExpandClick: () => void;
  expanded: string[];
};

export type PanelProps = {
    html: string;
    handleClick: HandleClick;
    addIslandData: (astroIsland: CurrentComp, id: string) => void;
    addId: Set<string>;
    idArray: string[];
}