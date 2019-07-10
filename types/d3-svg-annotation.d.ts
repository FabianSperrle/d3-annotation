import { Dispatch } from 'd3-dispatch';
import { BaseType, Selection } from 'd3-selection';

type Accessors = {
  [k: string]: () => number
};

// TODO figure out what these actually are.
type Components = any[];

type Orientation = 'topBottom' | 'leftRight' | 'fixed';
type Align = 'dynamic' | 'left' | 'right' | 'top' | 'bottom' | 'middle';
type LineType = 'horizontal' | 'vertical' | 'none';

type BBox = {
  x: number,
  y: number,
  width: number,
  height: number
};

declare class AnnotationNote {
  title: string;
  label: string;
  wrapSplitter: string;
  bgPadding: {
    top: number,
    left: number,
    right: number,
    bottom: number,
  } | number;
}

declare class Annotation<T> {
  constructor();

  className: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  offset: {
    x: number;
    y: number;
  };
  position: {
    x: number;
    y: number;
  };
  translation: {
    x: number;
    y: number;
  };
  json: {
    x: number;
    y: number;
    dx: number;
    dy: number;
  };
  data: T;
  note: AnnotationNote;

  annotations(anotations: any[]): Annotation<T>;
  accessors(accessors: { x?: (datum: T) => any, y?: (datum: T) => any }): Annotation<T>;
  accessorsInverse(accessors: any): Annotation<T>;
  editMode(editMode: boolean): Annotation<T>;
  notePadding(padding: number): Annotation<T>;
  type(type: any): Annotation<T>;
  updatePosition(): void;
  updateOffset(): void;
  update(): void;
  updatedAccessors(): void;
  on(type: string, callback: (annotation) => void): Annotation<T>;
}

declare class Type<T> {
  a: Selection<BaseType, any, any, any>;
  note: Selection<Element, any, any, any> | false;
  noteContent: Selection<Element, any, any, any> | false;
  connector: Selection<Element, any, any, any> | false;
  subject: Selection<Element, any, any, any> | false;
  annotation: Annotation<T>;
  editMode: boolean;
  notePadding: number;
  offsetCornerX: number;
  offsetCornerY: number;

  constructor(args: {
    a: Selection<any, any, any, any>,
    annotation: Annotation<T>,
    editMode?: boolean,
    dispatcher?: Dispatch<Element>,
    notePadding?: number,
    accessors?: Accessors
  });

  init(accessors: Accessors): void;

  mapY(accessors: Accessors): void;

  mapX(accessors: Accessors): void;

  updateEditMode(): void;

  drawOnSVG(
    component: Selection<Element, any, any, any>,
    builders: Array<
      { type: string, className: string, attributes: {}, handles?: any[] }>):
    void;

  getNoteBBox(): BBox;

  getNoteBBoxOffset(): BBox;

  drawSubject(context?: { type: string }): Components;

  drawConnector(context?: { type: string, end: string }): Components;

  drawNote(context: {
    orientation: Orientation,
    align: Align,
    lineType: LineType,
    bbox: BBox,
  }): Components;

  drawNoteContent(context: {
    orientation: Orientation,
    lineType: LineType,
    align: Align,
    bbox: BBox,
  }): Array<void>;

  drawOnScreen(component: any, drawFunction: () => any): void;

  redrawSubmit(): void;

  redrawConnector(bbox?: BBox): void;

  redrawNote(bbox?: BBox): void;

  setPosition(): void;

  setOffset(): void;

  setPositionWithAccessors(accessors?: Accessors): void;

  setClassName(): void;

  draw(): void;

  dragstarted(): void;
  drawended(): void;
  dragSubject(): void;
  dragNode(): void;
  mapHandler(handles: Array<{}>): { start: () => void, end: () => void };
}

// TODO define these
declare class annotationLabel<T> extends Type<T> { }
declare class annotationCallout<T> extends Type<T> { }
declare class annotationCalloutElbow<T> extends Type<T> { }
declare class annotationCalloutCurve<T> extends Type<T> { }
declare class annotationCalloutCircle<T> extends Type<T> { }
declare class annotationCalloutRect<T> extends Type<T> { }
declare class annotationXYThreshold<T> extends Type<T> { }
declare class annotationBadge<T> extends Type<T> { }

declare interface CustomAnnotationSettings {
  disable?: string[];
  className?: string;
  subject?: any;
  connector?: any;
  note?: any;
}

declare class annotationCustomType<T> extends Type<T> {
  constructor(type: typeof Type, settings: CustomAnnotationSettings);
}

declare function annotation<T>(): Annotation<T>;

export = Annotation;
