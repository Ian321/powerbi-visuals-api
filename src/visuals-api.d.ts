declare namespace powerbi {
    const enum VisualDataRoleKind {
        /** Indicates that the role should be bound to something that evaluates to a grouping of values. */
        Grouping = 0,
        /** Indicates that the role should be bound to something that evaluates to a single value in a scope. */
        Measure = 1,
        /** Indicates that the role can be bound to either Grouping or Measure. */
        GroupingOrMeasure = 2,
    }
    export const enum VisualDataRoleKindPreference {
        Measure,
        Grouping,
    }
    const enum VisualDataChangeOperationKind {
        Create = 0,
        Append = 1,
        Segment = 2,
    }
    /** 
     * Binary system is used for types flags managing, so VisualUpdateType value
     * represents a combination of all received types
     */
    const enum VisualUpdateType {
        Data = 1 << 1,
        Resize = 1 << 2,
        ViewMode = 1 << 3,
        Style = 1 << 4,
        ResizeEnd = 1 << 5,
        FormattingSubSelectionChange = 1 << 6,
        FormatModeChange = 1 << 7,
        FilterOptionsChange = 1 << 8,
        All = Data | Resize | ViewMode | Style | ResizeEnd | FormattingSubSelectionChange | FormatModeChange | FilterOptionsChange
    }
    const enum VisualPermissions {
    }
    const enum CartesianRoleKind {
        X = 0,
        Y = 1,
    }
    const enum ViewMode {
        View = 0,
        Edit = 1,
        InFocusEdit = 2,
    }
    const enum EditMode {
        /** Default editing mode for the visual. */
        Default = 0,
        /** Indicates the user has asked the visual to display advanced editing controls. */
        Advanced = 1,
    }
    const enum AdvancedEditModeSupport {
        /** The visual doesn't support Advanced Edit mode. Do not display the 'Edit' button on this visual. */
        NotSupported = 0,
        /** The visual supports Advanced Edit mode, but doesn't require any further changes aside from setting EditMode=Advanced. */
        SupportedNoAction = 1,
        /** The visual supports Advanced Edit mode, and requires that the host pops out the visual when entering Advanced EditMode. */
        SupportedInFocus = 2,
    }
    const enum ResizeMode {
        Resizing = 1,
        Resized = 2,
    }
    const enum JoinPredicateBehavior {
        /** Prevent items in this role from acting as join predicates. */
        None = 0,
    }
    const enum PromiseResultType {
        Success = 0,
        Failure = 1,
    }
    /**
     * Defines actions to be taken by the visual in response to a selection.
     *
     * An undefined/null VisualInteractivityAction should be treated as Selection,
     * as that is the default action.
     */
    const enum VisualInteractivityAction {
        /** Normal selection behavior which should call onSelect */
        Selection = 0,
        /** No additional action or feedback from the visual is needed */
        None = 1,
    }
    /**
     * Defines various events Visuals can notify the host on.
     */
    const enum VisualEventType {
        /** Should be used at the beginning of a visual's rendering operation. */
        RenderStarted = 0,
        /** Should be used at the end of a visual's rendering operation. */
        RenderCompleted = 1,
        /** Should be used by visuals to trace information in PBI telemetry. */
        Trace = 2,
        /** Should be used by visuals to trace errors in PBI telemetry. */
        Error = 3,
    }
    const enum FilterAction {
        /** Merging filter into existing filters. */
        merge = 0,
        /** removing existing filter. */
        remove = 1,
    }
    export const enum VisualObjectCategoryOptions {
        /** The configuration affects visual's formatting - look & feel, colors, axes, labels etc.*/
        Formatting = 1,

        /** The configuration controls an analytical visual aid - forcasts, trendlines, reference lines and shapes etc.*/
        Analytics = 2,
    }
    const enum DialogAction {
        Close = 0,
        OK = 1,
        Cancel = 2,
        Continue = 3,
        No = 4,
        Yes = 5
    }
    const enum VisualDialogPositionType {
        Center = 0,
        RelativeToVisual = 1
    }

    export const enum ServicePlanState {
        /** Indicates that the license is not active and shouldn't be used for provisioning benefits.  */
        Inactive = 0,

        /** Indicates that the license is active and can be used for provisioning benefits. */
        Active = 1,

        /** Indicates that the license is in grace period likely due to payment violation. */
        Warning = 2,

        /** Indicates that the license is suspended likely due to payment violation. */
        Suspended = 3,

        /** Sentinel value. */
        Unknown = 4
    }

    export const enum LicenseNotificationType {
        /** Used by the visual to display an icon license notification, display "upgrade" button. */
        General = 0,

        /** Used by the visual to display an unsupported environment license notification, "upgrade" button won't be displayed. */
        UnsupportedEnv = 1,

        /** Used by the visual to display a blocker license notification, display "upgrade" button. */
        VisualIsBlocked = 2,
    }

    export const enum DrillType {
        Up = 1,

        /** Grouping becomes the union of the current grouping and the next level in the hierarchy / Provides behavior of drilling down on a data point when used with a datapoint. */
        Down = 2,

        /** Grouping becomes the next level in the hierarchy exclusively. Current level grouping is dropped. */
        MoveToNextlevel = 3,
    }

    export const enum RowSubtotalType {
        Top = "Top",
        Bottom = "Bottom",
    }
}


declare module powerbi.visuals.plugins {
    /** This IVisualPlugin interface is only used by the CLI tools when compiling */
    export interface IVisualPlugin {
        /** The name of the plugin.  Must match the property name in powerbi.visuals. */
        name: string;

        /** Function to call to create the visual. */
        create: (options?: extensibility.visual.VisualConstructorOptions) => extensibility.IVisual;

        /** Function to call to create a modal dialog. */
        createModalDialog?: (dialogId: string, options: extensibility.visual.DialogConstructorOptions, initialState: object) => void;

        /** The class of the plugin.  At the moment it is only used to have a way to indicate the class name that a custom visual has. */
        class: string;

        /** Check if a visual is custom */
        custom: boolean;

        /** The version of the api that this plugin should be run against */
        apiVersion: string;

        /** Human readable plugin name displayed to users */
        displayName: string;

    }
}


declare module jsCommon {
    export interface IStringResourceProvider {
        get(id: string): string;
        getOptional(id: string): string;
    }
}


declare module powerbi {
    /** 
     * An interface to promise/deferred, 
     * which abstracts away the underlying mechanism (e.g., Angular, jQuery, etc.). 
     */
    export interface IPromiseFactory {
        /** 
         * Creates a Deferred object which represents a task which will finish in the future.
         */
        defer<T>(): IDeferred<T>;

        /** 
         * Creates a Deferred object which represents a task which will finish in the future.
         */
        defer<TSuccess, TError>(): IDeferred2<TSuccess, TError>;

        /**
         * Creates a promise that is resolved as rejected with the specified reason.
         * This api should be used to forward rejection in a chain of promises.
         * If you are dealing with the last promise in a promise chain, you don't need to worry about it.
         * When comparing deferreds/promises to the familiar behavior of try/catch/throw,
         * think of reject as the throw keyword in JavaScript.
         * This also means that if you "catch" an error via a promise error callback and you want 
         * to forward the error to the promise derived from the current promise, 
         * you have to "rethrow" the error by returning a rejection constructed via reject.
         * 
         * @param reason Constant, message, exception or an object representing the rejection reason.
         */
        reject<TError>(reason?: TError): IPromise2<any, TError>;

        /**
         * Creates a promise that is resolved with the specified value.
         * This api should be used to forward rejection in a chain of promises. 
         * If you are dealing with the last promise in a promise chain, you don't need to worry about it.
         *
         * @param value Object representing the promise result.
         */
        resolve<TSuccess>(value?: TSuccess): IPromise2<TSuccess, any>;

        /**
         * Combines multiple promises into a single promise that is resolved when all of the input promises are resolved.
         * Rejects immediately if any of the promises fail
         */
        all(promises: IPromise2<any, any>[]): IPromise<any[]>;

        /**
         * Combines multiple promises into a single promise that is resolved when all of the input promises are resolved.
         * Does not resolve until all promises finish (success or failure).
         */
        allSettled<T>(promises: IPromise2<any, any>[]): IPromise<IPromiseResult<T>[]>;

        /**
         * Wraps an object that might be a value or a then-able promise into a promise. 
         * This is useful when you are dealing with an object that might or might not be a promise
         */
        when<T>(value: T | IPromise<T>): IPromise<T>;
    }

    /** 
     * Represents an operation, to be completed (resolve/rejected) in the future.
     */
    export interface IPromise<T> extends IPromise2<T, T> {
    }

    /**
     * Represents an operation, to be completed (resolve/rejected) in the future.
     * Success and failure types can be set independently.
     */
    export interface IPromise2<TSuccess, TError> {
        /**
         * Regardless of when the promise was or will be resolved or rejected, 
         * then calls one of the success or error callbacks asynchronously as soon as the result is available.
         * The callbacks are called with a single argument: the result or rejection reason.
         * Additionally, the notify callback may be called zero or more times to provide a progress indication, 
         * before the promise is resolved or rejected.
         * This method returns a new promise which is resolved or rejected via 
         * the return value of the successCallback, errorCallback.
         */
        then<TSuccessResult, TErrorResult>(successCallback: (promiseValue: TSuccess) => IPromise2<TSuccessResult, TErrorResult>, errorCallback?: (reason: TError) => TErrorResult): IPromise2<TSuccessResult, TErrorResult>;

        /**
         * Regardless of when the promise was or will be resolved or rejected,
         * then calls one of the success or error callbacks asynchronously as soon as the result is available.
         * The callbacks are called with a single argument: the result or rejection reason.
         * Additionally, the notify callback may be called zero or more times to provide a progress indication,
         * before the promise is resolved or rejected.
         * This method returns a new promise which is resolved or rejected via 
         * the return value of the successCallback, errorCallback.
         */
        then<TSuccessResult, TErrorResult>(successCallback: (promiseValue: TSuccess) => TSuccessResult, errorCallback?: (reason: TError) => TErrorResult): IPromise2<TSuccessResult, TErrorResult>;

        /**
         * Shorthand for promise.then(null, errorCallback).
         */
        catch<TErrorResult>(onRejected: (reason: any) => IPromise2<TSuccess, TErrorResult>): IPromise2<TSuccess, TErrorResult>;

        /**
         * Shorthand for promise.then(null, errorCallback).
         */
        catch<TErrorResult>(onRejected: (reason: any) => TErrorResult): IPromise2<TSuccess, TErrorResult>;

        /**
         * Allows you to observe either the fulfillment or rejection of a promise, 
         * but to do so without modifying the final value.
         * This is useful to release resources or do some clean-up that needs to be done 
         * whether the promise was rejected or resolved.
         * See the full specification for more information.
         * Because finally is a reserved word in JavaScript and reserved keywords 
         * are not supported as property names by ES3, you'll need to invoke 
         * the method like promise['finally'](callback) to make your code IE8 and Android 2.x compatible.
         */
        finally<T, U>(finallyCallback: () => any): IPromise2<T, U>;
    }

    export interface IDeferred<T> extends IDeferred2<T, T> {
    }

    export interface IDeferred2<TSuccess, TError> {
        resolve(value: TSuccess): void;
        reject(reason?: TError): void;
        promise: IPromise2<TSuccess, TError>;
    }

    export interface RejectablePromise2<T, E> extends IPromise2<T, E> {
        reject(reason?: E): void;
        resolved(): boolean;
        rejected(): boolean;
        pending(): boolean;
    }

    export interface RejectablePromise<T> extends RejectablePromise2<T, T> {
    }

    export interface IResultCallback<T> {
        (result: T, done: boolean): void;
    }

    export interface IPromiseResult<T> {
        type: PromiseResultType;
        value: T;
    }
}


declare module powerbi.visuals {
    import Selector = data.Selector;
    import SelectorsByColumn = data.SelectorsByColumn;

    export interface CustomVisualOpaqueIdentity { }
    export interface ISelectionIdBuilder {
        withCategory(categoryColumn: DataViewCategoryColumn, index: number): this;
        withSeries(seriesColumn: DataViewValueColumns, valueColumn: DataViewValueColumn | DataViewValueColumnGroup): this;
        withMeasure(measureId: string): this;
        withMatrixNode(matrixNode: DataViewMatrixNode, levels: DataViewHierarchyLevel[]): this;
        withTable(table: DataViewTable, rowIndex: number): this;
        createSelectionId(): ISelectionId;
    }

    export interface ISelectionId {
        equals(other: ISelectionId): boolean;
        includes(other: ISelectionId, ignoreHighlight?: boolean): boolean;
        getKey(): string;
        getSelector(): Selector;
        getSelectorsByColumn(): SelectorsByColumn;
        hasIdentity(): boolean;
    }
}


declare module powerbi {
    export const enum SortDirection {
        Ascending = 1,
        Descending = 2,
    }
}


declare module powerbi {
    export interface QueryTransformTypeDescriptor {
    }
}


declare module powerbi {
    /** Represents views of a data set. */
    export interface DataView {
        metadata: DataViewMetadata;
        categorical?: DataViewCategorical;
        single?: DataViewSingle;
        tree?: DataViewTree;
        table?: DataViewTable;
        matrix?: DataViewMatrix;
        scriptResult?: DataViewScriptResultData;
    }

    export interface DataViewMetadata {
        columns: DataViewMetadataColumn[];

        /** The metadata repetition objects. */
        objects?: DataViewObjects;

        /** When defined, describes whether the DataView contains just a segment of the complete data set. */
        segment?: DataViewSegmentMetadata;

        /** Describes the data reduction applied to this data set when limits are exceeded. */
        dataReduction?: DataViewReductionMetadata;

        /** Contains metadata about the dataRoles */
        dataRoles?: DataRolesInfo;

        /** Specifies if any filter applied affects the visual */
        isDataFilterApplied?: boolean;
    }

    export interface DataRolesInfo {
        drillableRoles?: powerbi.DrillableRoles;
    }

    export interface DataViewMetadataColumn {
        /** The user-facing display name of the column. */
        displayName: string;

        /** The query name the source column in the query. */
        queryName?: string;

        /** The format string of the column. */
        format?: string; // TODO: Deprecate this, and populate format string through objects instead.

        /** Data type information for the column. */
        type?: ValueTypeDescriptor;

        /** Indicates that this column is a measure (aggregate) value. */
        isMeasure?: boolean;

        /** The position of the column in the select statement. */
        index?: number;

        /** The properties that this column provides to the visualization. */
        roles?: { [name: string]: boolean };

        /** The metadata repetition objects. */
        objects?: DataViewObjects;

        /** The name of the containing group. */
        groupName?: PrimitiveValue;

        /** The sort direction of this column. */
        sort?: SortDirection;

        /** The order sorts are applied. Lower values are applied first. Undefined indicates no sort was done on this column. */
        sortOrder?: number;

        /** The KPI metadata to use to convert a numeric status value into its visual representation. */
        kpi?: DataViewKpiColumnMetadata;

        /** Indicates that aggregates should not be computed across groups with different values of this column. */
        discourageAggregationAcrossGroups?: boolean;

        /** The aggregates computed for this column, if any. */
        aggregates?: DataViewColumnAggregates;

        /** The SQExpr this column represents. */
        expr?: data.ISQExpr;

        /**
         * The set of expressions that define the identity for instances of this grouping field.
         * This must be a subset of the items in the DataViewScopeIdentity in the grouped items result.
         * This property is undefined for measure fields, as well as for grouping fields in DSR generated prior to the CY16SU08 or SU09 timeframe.
         */
        identityExprs?: data.ISQExpr[];

        parameter?: DataViewParameterColumnMetadata;
    }

    export interface DataViewSegmentMetadata {
    }

    export interface DataViewReductionMetadata {
        categorical?: DataViewCategoricalReductionMetadata;
    }

    export interface DataViewCategoricalReductionMetadata {
        categories?: DataViewReductionAlgorithmMetadata;
        values?: DataViewReductionAlgorithmMetadata;
        metadata?: DataViewReductionAlgorithmMetadata;
    }

    export interface DataViewReductionAlgorithmMetadata {
        binnedLineSample?: {};
    }

    export interface DataViewColumnAggregates {
        subtotal?: PrimitiveValue;
        max?: PrimitiveValue;
        min?: PrimitiveValue;
        average?: PrimitiveValue;
        median?: PrimitiveValue;
        count?: number;
        percentiles?: DataViewColumnPercentileAggregate[];

        /** Represents a single value evaluation, similar to a total. */
        single?: PrimitiveValue;

        /** Client-computed maximum value for a column. */
        maxLocal?: PrimitiveValue;

        /** Client-computed maximum value for a column. */
        minLocal?: PrimitiveValue;
    }

    export interface DataViewColumnPercentileAggregate {
        exclusive?: boolean;
        k: number;
        value: PrimitiveValue;
    }

    export interface DataViewCategorical {
        categories?: DataViewCategoryColumn[];
        values?: DataViewValueColumns;
    }

    export interface DataViewCategoricalColumn {
        source: DataViewMetadataColumn;

        /** The data repetition objects. */
        objects?: DataViewObjects[];
    }

    export interface DataViewValueColumns extends Array<DataViewValueColumn> {
        /** Returns an array that groups the columns in this group together. */
        grouped(): DataViewValueColumnGroup[];

        /** The set of expressions that define the identity for instances of the value group.  This must match items in the DataViewScopeIdentity in the grouped items result. */
        identityFields?: data.ISQExpr[];

        source?: DataViewMetadataColumn;
    }

    export interface DataViewValueColumnGroup {
        values: DataViewValueColumn[];
        identity?: visuals.CustomVisualOpaqueIdentity;

        /** The data repetition objects. */
        objects?: DataViewObjects;

        name?: PrimitiveValue;
    }

    export interface DataViewValueColumn extends DataViewCategoricalColumn {
        values: PrimitiveValue[];
        highlights?: PrimitiveValue[];
        identity?: visuals.CustomVisualOpaqueIdentity;
    }

    // NOTE: The following is needed for backwards compatibility and should be deprecated.  Callers should use
    // DataViewMetadataColumn.aggregates instead.
    export interface DataViewValueColumn extends DataViewColumnAggregates {
    }

    export interface DataViewCategoryColumn extends DataViewCategoricalColumn {
        values: PrimitiveValue[];
        identity?: visuals.CustomVisualOpaqueIdentity[];

        /** The set of expressions that define the identity for instances of the category.  This must match items in the DataViewScopeIdentity in the identity. */
        identityFields?: data.ISQExpr[];
    }

    export interface DataViewSingle {
        value: PrimitiveValue;
    }

    export interface DataViewTree {
        root: DataViewTreeNode;
    }

    export interface DataViewTreeNode {
        name?: PrimitiveValue;

        /**
         * When used under the context of DataView.tree, this value is one of the elements in the values property.
         *
         * When used under the context of DataView.matrix, this property is the value of the particular 
         * group instance represented by this node (e.g. In a grouping on Year, a node can have value == 2016).
         *
         * DEPRECATED for usage under the context of DataView.matrix: This property is deprecated for objects 
         * that conform to the DataViewMatrixNode interface (which extends DataViewTreeNode).
         * New visuals code should consume the new property levelValues on DataViewMatrixNode instead.
         * If this node represents a composite group node in matrix, this property will be undefined.
         */
        value?: PrimitiveValue;

        /** 
         * This property contains all the values in this node. 
         * The key of each of the key-value-pair in this dictionary is the position of the column in the 
         * select statement to which the value belongs.
         */
        values?: { [id: number]: DataViewTreeNodeValue };

        children?: DataViewTreeNode[];
        identity?: visuals.CustomVisualOpaqueIdentity;

        /** The data repetition objects. */
        objects?: DataViewObjects;

        /** The set of expressions that define the identity for the child nodes.  This must match items in the DataViewScopeIdentity of those nodes. */
        childIdentityFields?: data.ISQExpr[];

        /**
         * TRUE if the node is Collapsed
         * FALSE if it is Expanded
         * Undefined if it cannot be Expanded (e.g. subtotal)
         */
        isCollapsed?: boolean;
    }

    export interface DataViewTreeNodeValue {
        value?: PrimitiveValue;
    }

    export interface DataViewTreeNodeMeasureValue extends DataViewTreeNodeValue, DataViewColumnAggregates {
        highlight?: PrimitiveValue;
    }

    export interface DataViewTreeNodeGroupValue extends DataViewTreeNodeValue {
        count?: PrimitiveValue;
    }

    export interface DataViewTable {
        columns: DataViewMetadataColumn[];

        identity?: visuals.CustomVisualOpaqueIdentity[];

        /** The set of expressions that define the identity for rows of the table.  This must match items in the DataViewScopeIdentity in the identity. */
        identityFields?: data.ISQExpr[];

        rows?: DataViewTableRow[];

        totals?: PrimitiveValue[];
    }

    export interface DataViewTableRow extends Array<PrimitiveValue> {
        /** The data repetition objects. */
        objects?: DataViewObjects[];
    }

    export interface DataViewMatrix {
        rows: DataViewHierarchy;
        columns: DataViewHierarchy;

        /**
         * The metadata columns of the measure values.
         * In visual DataView, this array is sorted in projection order.
         */
        valueSources: DataViewMetadataColumn[];
    }

    export interface DataViewMatrixNode extends DataViewTreeNode {
        /** Indicates the level this node is on. Zero indicates the outermost children (root node level is undefined). */
        level?: number;

        children?: DataViewMatrixNode[];

        /* If this DataViewMatrixNode represents the  inner-most dimension of row groups (i.e. a leaf node), then this property will contain the values at the 
        * matrix intersection under the group. The valueSourceIndex property will contain the position of the column in the select statement to which the 
        * value belongs.
        *
        * When this DataViewMatrixNode is used under the context of DataView.matrix.columns, this property is not used.
        */
        values?: { [id: number]: DataViewMatrixNodeValue };

        /**
         * Indicates the source metadata index on the node's level. Its value is 0 if omitted.
         *
         * DEPRECATED: This property is deprecated and exists for backward-compatibility only.
         * New visuals code should consume the new property levelSourceIndex on DataViewMatrixGroupValue instead.
         */
        levelSourceIndex?: number;

        /**
         * The values of the particular group instance represented by this node.
         * This array property would contain more than one element in a composite group
         * (e.g. Year == 2016 and Month == 'January').
         */
        levelValues?: DataViewMatrixGroupValue[];

        /** Indicates whether or not the node is a subtotal node. Its value is false if omitted. */
        isSubtotal?: boolean;
    }

    /**
     * Represents a value at a particular level of a matrix's rows or columns hierarchy.
     * In the hierarchy level node is an instance of a composite group, this object will
     * be one of multiple values
     */
    export interface DataViewMatrixGroupValue extends DataViewTreeNodeValue {
        /**
         * Indicates the index of the corresponding column for this group level value 
         * (held by DataViewHierarchyLevel.sources).
         *
         * @example
         * // For example, to get the source column metadata of each level value at a particular row hierarchy node:
         * let matrixRowsHierarchy: DataViewHierarchy = dataView.matrix.rows;
         * let targetRowsHierarchyNode = <DataViewMatrixNode>matrixRowsHierarchy.root.children[0];
         * // Use the DataViewMatrixNode.level property to get the corresponding DataViewHierarchyLevel...
         * let targetRowsHierarchyLevel: DataViewHierarchyLevel = matrixRows.levels[targetRowsHierarchyNode.level];
         * for (let levelValue in rowsRootNode.levelValues) {
         *   // columnMetadata is the source column for the particular levelValue.value in this loop iteration
         *   let columnMetadata: DataViewMetadataColumn = 
         *     targetRowsHierarchyLevel.sources[levelValue.levelSourceIndex];
         * }
         */
        levelSourceIndex: number;
    }

    /** Represents a value at the matrix intersection, used in the values property on DataViewMatrixNode (inherited from DataViewTreeNode). */
    export interface DataViewMatrixNodeValue extends DataViewTreeNodeValue {
        highlight?: PrimitiveValue;

        /** The data repetition objects. */
        objects?: DataViewObjects;

        /** Indicates the index of the corresponding measure (held by DataViewMatrix.valueSources). Its value is 0 if omitted. */
        valueSourceIndex?: number;
    }

    export interface DataViewHierarchy {
        root: DataViewMatrixNode;
        levels: DataViewHierarchyLevel[];
    }

    export interface DataViewHierarchyLevel {
        /**
         * The metadata columns of this hierarchy level.
         * In visual DataView, this array is sorted in projection order.
         */
        sources: DataViewMetadataColumn[];

        /** If TRUE, this level can be expanded/collapsed */
        canBeExpanded?: boolean;
    }

    export interface DataViewKpiColumnMetadata {
        graphic: string;

        // When false, five state KPIs are in: { -2, -1, 0, 1, 2 }. 
        // When true, five state KPIs are in: { -1, -0.5, 0, 0.5, 1 }.
        normalizedFiveStateKpiRange?: boolean;
    }

    /** Indicates the column is a what-if parameter */
    export interface DataViewParameterColumnMetadata {
    }

    export interface DataViewScriptResultData {
        payloadBase64: string;
    }

    export interface ValueRange<T> {
        min?: T;
        max?: T;
    }

    /** Defines the acceptable values of a number. */
    export type NumberRange = ValueRange<number>;

    /** Defines the PrimitiveValue range. */
    export type PrimitiveValueRange = ValueRange<PrimitiveValue>;

    export interface DrillableRoles {
        [role: string]: DrillType[];
    }

    export interface DrillUpArgs {
        roleName: string;
        drillType: DrillType.Up;
    }

    export interface DrillMoveNextLevelArgs {
        roleName: string;
        drillType: DrillType.MoveToNextlevel;
    }

    export interface DrillDownArgs {
        roleName: string;
        drillType: DrillType.Down;
    }

    export type DrillArgs = DrillUpArgs | DrillDownArgs | DrillMoveNextLevelArgs;
}


declare module powerbi {
    /** Represents evaluated, named, custom objects in a DataView. */
    export interface DataViewObjects {
        [name: string]: DataViewObject;
    }

    /** Represents an object (name-value pairs) in a DataView. */
    export interface DataViewObject {
        /** Map of property name to property value. */
        [propertyName: string]: DataViewPropertyValue;

        /** Instances of this object. When there are multiple instances with the same object name they will appear here. */
        $instances?: DataViewObjectMap;
    }

    export interface DataViewObjectWithId {
        id: string;
        object: DataViewObject;
    }

    export interface DataViewObjectPropertyIdentifier {
        objectName: string;
        propertyName: string;
    }

    export type DataViewObjectMap = { [id: string]: DataViewObject };

    export type DataViewPropertyValue = PrimitiveValue | StructuralObjectValue;
}


declare module powerbi.data {
    /** Defines a match against all instances of given roles. */
    export interface DataViewRoleWildcard {
        kind: DataRepetitionKind.RoleWildcard;
        roles: string[];
        key: string;
    }
}

declare module powerbi.data {
    /** Defines a match against all instances of a given DataView scope. Does not match Subtotals. */
    export interface DataViewScopeWildcard {
        kind: DataRepetitionKind.ScopeWildcard;
        exprs: ISQExpr[];
        key: string;
    }
}


declare module powerbi.data {
    import IStringResourceProvider = jsCommon.IStringResourceProvider;

    export type DisplayNameGetter = ((resourceProvider: IStringResourceProvider) => string) | string;
}


declare module powerbi.data {
    //intentionally blank interfaces since this is not part of the public API
    export interface Selector { }

    export interface SelectorsByColumn { }

    export interface ISemanticFilter { }

    export interface ISQExpr { }

    export interface ISQConstantExpr extends ISQExpr { }

    export const enum FieldKind {
        /** Indicates the field references a column, which evaluates to a distinct set of values (e.g., Year, Name, SalesQuantity, etc.). */
        Column,

        /** Indicates the field references a measure, which evaluates to a single value (e.g., SalesYTD, Sum(Sales), etc.). */
        Measure,
    }
}


declare namespace powerbi {
    /** Kind of the Data Repetition Selector */

    export const enum DataRepetitionKind {
        RoleWildcard = 0,
        ScopeIdentity = 1,
        ScopeTotal = 2,
        ScopeWildcard = 3,
    }
}


declare module powerbi.data {
    /** Defines a match against any Total within a given DataView scope. */
    export interface DataViewScopeTotal {
        kind: DataRepetitionKind.ScopeTotal;

        /* The exprs defining the scope that this Total has been evaluated for
         * It's an array to support expressing Total across a composite group
         * Example: If this represents Total sales of USA across States, the Exprs wil refer to "States"
        */
        exprs: ISQExpr[];

        key: string;
    }
}


declare module powerbi {
    export interface DefaultValueDefinition {
        value: data.ISQConstantExpr;
        identityFieldsValues?: data.ISQConstantExpr[];
    }

    export interface DefaultValueTypeDescriptor {
        defaultValue: boolean;
    }
}


declare module powerbi {
    import DisplayNameGetter = powerbi.data.DisplayNameGetter;

    export type EnumMemberValue = string | number;

    export interface IEnumMember {
        value: EnumMemberValue;
        displayName: DisplayNameGetter;
    }

    /** Defines a custom enumeration data type, and its values. */
    export interface IEnumType {
        /** Gets the members of the enumeration, limited to the validMembers, if appropriate. */
        members(validMembers?: EnumMemberValue[]): IEnumMember[];
    }

}


declare module powerbi {
    export interface Fill {
        solid?: {
            color?: string;
        };
        gradient?: {
            startColor?: string;
            endColor?: string;
        };
        pattern?: {
            patternKind?: string;
            color?: string;
        };
    }

    export interface FillTypeDescriptor {
        solid?: {
            color?: FillSolidColorTypeDescriptor;
        };
        gradient?: {
            startColor?: boolean;
            endColor?: boolean;
        };
        pattern?: {
            patternKind?: boolean;
            color?: boolean;
        };
    }

    export type FillSolidColorTypeDescriptor = boolean | FillSolidColorAdvancedTypeDescriptor;

    export interface FillSolidColorAdvancedTypeDescriptor {
        /** Indicates whether the color value may be nullable, and a 'no fill' option is appropriate. */
        nullable: boolean;
    }
}


declare module powerbi {
    export interface FillRule extends FillRuleGeneric<string, number, string> {
    }

    export interface FillRuleTypeDescriptor {
    }

    export interface FillRuleGeneric<TColor, TValue, TStrategy> {
        linearGradient2?: LinearGradient2Generic<TColor, TValue, TStrategy>;
        linearGradient3?: LinearGradient3Generic<TColor, TValue, TStrategy>;

        // stepped2?
        // ...
    }

    export interface LinearGradient2Generic<TColor, TValue, TStrategy> {
        max: RuleColorStopGeneric<TColor, TValue>;
        min: RuleColorStopGeneric<TColor, TValue>;
        nullColoringStrategy?: NullColoringStrategyGeneric<TStrategy, TColor>;
    }
    export interface LinearGradient3Generic<TColor, TValue, TStrategy> {
        max: RuleColorStopGeneric<TColor, TValue>;
        mid: RuleColorStopGeneric<TColor, TValue>;
        min: RuleColorStopGeneric<TColor, TValue>;
        nullColoringStrategy?: NullColoringStrategyGeneric<TStrategy, TColor>;
    }

    export interface RuleColorStopGeneric<TColor, TValue> {
        color: TColor;
        value?: TValue;
    }

    export interface NullColoringStrategyGeneric<TStrategy, TColor> {
        strategy: TStrategy;
        /**
         * Only used if strategy is specificColor
         */
        color?: TColor;
    }
}


declare module powerbi {
    export interface FilterTypeDescriptor {
        selfFilter?: boolean;
    }
}


declare module powerbi {
    export type GeoJson = GeoJsonDefinitionGeneric<string>;

    export interface GeoJsonDefinitionGeneric<T> {
        type: T;
        name: T;
        content: T;
    }

    export interface GeoJsonTypeDescriptor { }
}


declare module powerbi {
    export type ImageValue = ImageDefinitionGeneric<string>;

    export interface ImageDefinitionGeneric<T> {
        name: T;
        url: T;
        scaling?: T;
    }

    export interface ImageTypeDescriptor { }

}


declare module powerbi {
    import ISQExpr = powerbi.data.ISQExpr;

    export type Paragraphs = Paragraph[];

    export interface Paragraph {
        horizontalTextAlignment?: string;
        textRuns: TextRun[];
    }

    export interface ParagraphsTypeDescriptor {
    }

    export interface TextRunStyle {
        fontFamily?: string;
        fontSize?: string;
        fontStyle?: string;
        fontWeight?: string;
        color?: string;
        textDecoration?: string;
    }

    export interface TextRun {
        textStyle?: TextRunStyle;
        url?: string;
        value: string;
        valueExpr?: ISQExpr;
    }
}

declare module powerbi {
    import SemanticFilter = data.ISemanticFilter;

    /** Defines instances of structural types. */
    export type StructuralObjectValue =
        Fill |
        FillRule |
        SemanticFilter |
        DefaultValueDefinition |
        ImageValue |
        Paragraphs |
        GeoJson |
        DataBars;

    /** Describes a structural type in the client type system. Leaf properties should use ValueType. */
    export interface StructuralTypeDescriptor {
        fill?: FillTypeDescriptor;
        fillRule?: FillRuleTypeDescriptor;
        filter?: FilterTypeDescriptor;
        expression?: DefaultValueTypeDescriptor;
        image?: ImageTypeDescriptor;
        paragraphs?: ParagraphsTypeDescriptor;
        geoJson?: GeoJsonTypeDescriptor;
        queryTransform?: QueryTransformTypeDescriptor;
        dataBars?: DataBarsTypeDescriptor;

        //border?: BorderTypeDescriptor;
        //etc.
    }
}


declare module powerbi {
    /** Describes a data value type in the client type system. Can be used to get a concrete ValueType instance. */
    export interface ValueTypeDescriptor {
        // Simplified primitive types
        readonly text?: boolean;
        readonly numeric?: boolean;
        readonly integer?: boolean;
        readonly bool?: boolean;
        readonly dateTime?: boolean;
        readonly duration?: boolean;
        readonly binary?: boolean;
        readonly none?: boolean; //TODO: 5005022 remove none type when we introduce property categories.

        // Extended types
        readonly temporal?: TemporalTypeDescriptor;
        readonly geography?: GeographyTypeDescriptor;
        readonly misc?: MiscellaneousTypeDescriptor;
        readonly formatting?: FormattingTypeDescriptor;
        /*readonly*/ enumeration?: IEnumType;
        readonly scripting?: ScriptTypeDescriptor;
        readonly operations?: OperationalTypeDescriptor;

        // variant types
        readonly variant?: ValueTypeDescriptor[];
    }

    export interface ScriptTypeDescriptor {
        readonly source?: boolean;
    }

    export interface TemporalTypeDescriptor {
        readonly year?: boolean;
        readonly quarter?: boolean;
        readonly month?: boolean;
        readonly day?: boolean;
        readonly paddedDateTableDate?: boolean;
    }

    export interface GeographyTypeDescriptor {
        readonly address?: boolean;
        readonly city?: boolean;
        readonly continent?: boolean;
        readonly country?: boolean;
        readonly county?: boolean;
        readonly region?: boolean;
        readonly postalCode?: boolean;
        readonly stateOrProvince?: boolean;
        readonly place?: boolean;
        readonly latitude?: boolean;
        readonly longitude?: boolean;
    }

    export interface MiscellaneousTypeDescriptor {
        readonly image?: boolean;
        readonly imageUrl?: boolean;
        readonly webUrl?: boolean;
        readonly barcode?: boolean;
    }

    export interface FormattingTypeDescriptor {
        readonly color?: boolean;
        readonly formatString?: boolean;
        readonly alignment?: boolean;
        readonly labelDisplayUnits?: boolean;
        readonly fontSize?: boolean;
        readonly fontFamily?: boolean;
        readonly labelDensity?: boolean;
        readonly bubbleSize?: boolean;
        readonly altText?: boolean;
    }

    export interface OperationalTypeDescriptor {
        readonly searchEnabled?: boolean;
    }

    /** Describes instances of value type objects. */
    export type PrimitiveValue = string | number | boolean | Date;
}


declare module powerbi {

    export interface DataBars {
        minValue?: number;
        maxValue?: number;
        positiveColor: Fill;
        negativeColor: Fill;
        axisColor: Fill;
        reverseDirection: boolean;
        hideText: boolean;
    }

    export interface DataBarsTypeDescriptor {
    }
}


declare module powerbi {
    export interface IViewport {
        height: number;
        width: number;
    }

    export interface ScaledViewport extends IViewport {
        scale: number;
    }
}


declare module powerbi {
    import Selector = powerbi.data.Selector;

    export const enum VisualEnumerationInstanceKinds {
        Constant = 1 << 0,
        Rule = 1 << 1,
        ConstantOrRule = Constant | Rule,
    }

    export interface VisualObjectInstance {
        /** The name of the object (as defined in VisualCapabilities). */
        objectName: string;

        /** A display name for the object instance. */
        displayName?: string;

        /** The set of property values for this object.  Some of these properties may be defaults provided by the IVisual. */
        properties: {
            [propertyName: string]: DataViewPropertyValue;
        };

        /** The selector that identifies this object. */
        selector: Selector;

        /** Additional selector used for conditional formatting at the static level for performance optimization. */
        altConstantValueSelector?: Selector;

        /** (Optional) Defines the constrained set of valid values for a property. */
        validValues?: {
            [propertyName: string]: string[] | ValidationOptions;
        };

        /** (Optional) VisualObjectInstanceEnumeration category index. */
        containerIdx?: number;

        /** (Optional) Set the required type for particular properties that support variant types. */
        propertyTypes?: {
            [propertyName: string]: ValueTypeDescriptor;
        };

        /** (Optional) Description of the type of instance that the property pane should display. If it doesn't exist, we assume constant only. */
        propertyInstanceKind?: {
            [propertyName: string]: VisualEnumerationInstanceKinds;
        };
    }

    export type VisualObjectInstanceEnumeration = VisualObjectInstance[] | VisualObjectInstanceEnumerationObject;

    export interface ValidationOptions {
        numberRange?: NumberRange;
    }

    export interface VisualObjectInstanceEnumerationObject {
        /** The visual object instances. */
        instances: VisualObjectInstance[];

        /** Defines a set of containers for related object instances. */
        containers?: VisualObjectInstanceContainer[];
    }

    export interface VisualObjectInstanceContainer {
        displayName: data.DisplayNameGetter;
    }

    export interface VisualObjectInstancesToPersist {
        /** Instances which should be merged with existing instances. */
        merge?: VisualObjectInstance[];

        /** Instances which should replace existing instances. */
        replace?: VisualObjectInstance[];

        /** Instances which should be deleted from the existing instances. */
        remove?: VisualObjectInstance[];

        /** Instances which should be deleted from the existing objects. */
        removeObject?: VisualObjectInstance[];
    }

    export interface EnumerateVisualObjectInstancesOptions {
        objectName: string;
    }
}



declare module powerbi {
    import Selector = powerbi.data.Selector;

    export interface VisualObjectRepetition {
        /** The selector that identifies the objects. */
        selector: Selector;

        /** Used to group differernt repetitions into containers. That will be used as the container displayName in the PropertyPane */
        containerName?: string;

        /** The set of repetition descriptors for this object. */
        objects: {
            [objectName: string]: DataViewRepetitionObjectDescriptor;
        };
    }

    export interface DataViewRepetitionObjectDescriptor {
        /** Properties used for formatting (e.g., Conditional Formatting). */
        formattingProperties?: string[];
    }

    export namespace VisualObjectRepetition {
        export interface VisualObjectRepetitionMetadata {
            propertyId: DataViewObjectPropertyIdentifier;
            selector: Selector;
            allowOverrideSubtotalMatching?: boolean;
            altStaticSelector?: Selector;
            propertyDescriptor: any; // Actual type DataViewObjectPropertyDescriptor
            /** For property pane usage. Display name for the Container in which to add a slice for this repetition  */
            containerName?: string;
        }
    }
}



declare module powerbi.extensibility {

    export interface IVisualPluginOptions {
        transform?: IVisualDataViewTransform;
    }

    export interface IVisualConstructor {
        __transform__?: IVisualDataViewTransform;
    }

    export interface IVisualDataViewTransform {
        <T>(dataview: DataView[]): T;
    }

    // These are the base interfaces. These should remain empty
    // All visual versions should extend these for type compatability

    export interface IVisual { }

    export interface IVisualHost { }

    export interface VisualUpdateOptions { }

    export interface VisualConstructorOptions {
        /** The loaded module, if any, defined by the IVisualPlugin.module. */
        module?: any;
    }

    export interface HostCapabilities {
        allowInteractions?: boolean;
        allowModalDialog?: boolean;
    }
}



declare module powerbi {
    export interface IColorInfo extends IStyleInfo {
        value: string;
    }

    export interface IStyleInfo {
        className?: string;
    }
}


declare module powerbi.extensibility {
    export interface IPoint {
        x: number;
        y: number;
    }

    interface ISelectionManager {
        toggleExpandCollapse(selectionId: ISelectionId, entireLevel?: boolean): IPromise<{}>;
        showContextMenu(selectionId: ISelectionId, position: IPoint, dataRoles?: string): IPromise<{}>
        select(selectionId: ISelectionId | ISelectionId[], multiSelect?: boolean): IPromise<ISelectionId[]>;
        hasSelection(): boolean;
        clear(): IPromise<{}>;
        getSelectionIds(): ISelectionId[];
        registerOnSelectCallback(callback: (ids: ISelectionId[]) => void): void;
    }
}


declare module powerbi.extensibility {
    export interface ISelectionId { }

    export interface ISelectionIdBuilder {
        withCategory(categoryColumn: DataViewCategoryColumn, index: number): this;
        withSeries(seriesColumn: DataViewValueColumns, valueColumn: DataViewValueColumn | DataViewValueColumnGroup): this;
        withMeasure(measureId: string): this;
        withMatrixNode(matrixNode: DataViewMatrixNode, levels: DataViewHierarchyLevel[]): this;
        withTable(table: DataViewTable, rowIndex: number): this;
        createSelectionId(): ISelectionId;
    }
}


declare module powerbi.extensibility {
    export interface IColorPalette {
        getColor(key: string): IColorInfo;
        reset(): IColorPalette;
    }

    /**
     * Interface for expanded color palette.
     * 
     * isHighContrast: boolean - when true, indicates that high-contrast accesibility support is active. Draw the visual using only foreground and background colors, and clearly visible strokes.
     * 
     * Also exposes non-data colors: foreground and variants, background and variants, sentiment indicators (positive, neutral, negative) and some specifc colors (e.g. hyperlink)
     */
    export interface ISandboxExtendedColorPalette extends IColorPalette {
        isHighContrast: boolean;
        /* foreground variants*/
        foreground: IColorInfo; /* Also used in High-contrast accessibility mode */
        foregroundLight: IColorInfo;
        foregroundDark: IColorInfo;
        foregroundNeutralLight: IColorInfo;
        foregroundNeutralDark: IColorInfo;
        foregroundNeutralSecondary: IColorInfo;
        foregroundNeutralSecondaryAlt: IColorInfo;
        foregroundNeutralSecondaryAlt2: IColorInfo;
        foregroundNeutralTertiary: IColorInfo;
        foregroundNeutralTertiaryAlt: IColorInfo;
        foregroundSelected: IColorInfo; /* Used only in High-contrast accessibility mode */
        foregroundButton: IColorInfo;
        /* background variants*/
        background: IColorInfo; /* Also used in High-contrast accessibility mode */
        backgroundLight: IColorInfo;
        backgroundNeutral: IColorInfo;
        backgroundDark: IColorInfo;
        /* specific purpose colors*/
        hyperlink: IColorInfo; /* Also used in High-contrast accessibility mode */
        visitedHyperlink: IColorInfo;
        mapPushpin: IColorInfo;
        shapeStroke: IColorInfo;
        selection?: IColorInfo;
        separator?: IColorInfo;
        /* sentiment indicators */
        negative?: IColorInfo;
        neutral?: IColorInfo;
        positive?: IColorInfo;
    }
}


declare module powerbi.extensibility {
    interface VisualTooltipDataItem {
        displayName: string;
        value: string;
        color?: string;
        header?: string;
        opacity?: string;
    }

    interface TooltipMoveOptions {
        coordinates: number[];
        isTouchEvent: boolean;
        dataItems?: VisualTooltipDataItem[];
        identities: ISelectionId[];
    }

    interface TooltipShowOptions extends TooltipMoveOptions {
        dataItems: VisualTooltipDataItem[];
    }

    interface TooltipHideOptions {
        isTouchEvent: boolean;
        immediately: boolean;
    }

    interface ITooltipService {
        enabled(): boolean;
        show(options: TooltipShowOptions): void;
        move(options: TooltipMoveOptions): void;
        hide(options: TooltipHideOptions): void;
    }
}


declare module powerbi.extensibility {
    interface ITelemetryService {
        readonly instanceId: string;
        trace(type: VisualEventType, payload?: string);
    }
}


declare module powerbi.extensibility {
    export function VisualPlugin(options: IVisualPluginOptions): ClassDecorator;
}

declare module powerbi.extensibility {
    export interface ILocalizationManager {
        getDisplayName(key: string): string;
    }
}

declare module powerbi {
    export interface AuthenticationToken {
        payload: string;
        resourceUrl: string;
    }
}

declare module powerbi.extensibility {
    export interface IAuthenticationService {
        getAADToken(visualId?: string): IPromise<string>;
        getResourceUrl(visualId?: string): IPromise<string>;
        getAADAuthenticationToken(visualId?: string): IPromise<powerbi.AuthenticationToken>;
    }
}

declare module powerbi.extensibility {
    export interface AcquireAADTokenResult {
        accessToken?: string;
    }

    export interface IAcquireAADTokenService {
        /** Returns an authentication token for the resource that the visual defined as a privilge
         * and the scope is the visual guid plus a constant string "_CV_ForPBI"
         * @returns the promise that resolves to the authentication token
        */
        acquireAADToken(): IPromise<AcquireAADTokenResult>;

        /**
         * Returns the availability status of the service.
         * 
         * @returns the promise that resolves to privilege status of the service
         */
        acquireAADTokenstatus(): IPromise<PrivilegeStatus>;
    }
}

declare module powerbi {
    /**
 * Represents a return type for privilege status query methods
 */
    export const enum PrivilegeStatus {
        /**
         * The privilege is allowed in the current environment
         */
        Allowed,

        /**
         * The privilege declaration is missing in visual capabilities section
         */
        NotDeclared,

        /**
         * The privilege is not supported in the current environment
         */
        NotSupported,

        /**
         * The privilege usage was denied by tenant administrator
         */
        DisabledByAdmin,
    }
}

declare module powerbi.extensibility {
    /** 
     * Provides an access to local storage for read / write access 
     */
    interface ILocalVisualStorageService {
        /**
         * Returns the availability status of the service.
         * 
         * @returns the promise that resolves to privilege status of the service
         */
        status(): IPromise<PrivilegeStatus>;

        /**
         * Returns promise that resolves to the data associated with 'key' if it was found or rejects otherwise.
         * 
         * @param key - the name of the payload to retrieve
         * @returns the promise that resolves to the data required or rejects if it wasn't found
         */
        get(key: string): IPromise<string>;

        /**
         * Saves the data to local storage. This data can be later be retrieved using the 'key'.
         * Returns a promise that resolves to the amount of free space available to caller after the save if there 
         * is any or rejects otherwise. 
         * 
         * @param key - the name of the payload to store
         * @param data - the payload string to store
         * @returns the promise resolves to the amount of free space available or rejects if there is no free space to store the data
         */
        set(key: string, data: string): IPromise<number>;

        /**
         * Deletes data associated with 'key' from local storage.
         * 
         * @param key - the name of the payload to remove
         */
        remove(key: string): void;
    }
}

declare module powerbi.extensibility {

    interface StorageV2ResultInfo {
        success: boolean;
    }

    /**
     * Provides an access to local storage for read / write access
     */
    interface IVisualLocalStorageV2Service {
        /**
         * Returns the availability status of the service.
         *
         * @returns the promise that resolves to privilege status of the service
         */
        status(): IPromise<PrivilegeStatus>;

        /**
         * Returns promise that resolves to the data associated with 'key' if it was found or rejects otherwise.
         *
         * @param key - the name of the payload to retrieve
         * @returns the promise that resolves to the data required or rejects if it wasn't found or an error occured.
         */
        get(key: string): IPromise<string>;

        /**
         * Saves the data to local storage. This data can be later be retrieved using the 'key'.
         * Returns a promise that resolves to StorageV2ResultInfo, or rejects if an error occured.
         *
         * @param key - the name of the payload to store
         * @param data - the payload string to store
         * @returns the promise resolves to StorageV2ResultInfo, or rejects if an error occured.
         */
        set(key: string, data: string): IPromise<StorageV2ResultInfo>;

        /**
         * Deletes data associated with 'key' from local storage.
         *
         * @param key - the name of the payload to remove
         */
        remove(key: string): void;
    }
}

declare module powerbi.extensibility {
    /** 
     * An interface for reporting rendering events 
     */
    export interface IVisualEventService {
        /**
         * Called just before the actual rendering was started.
         */
        renderingStarted(options: VisualUpdateOptions): void;

        /**
         * Called immediately after finishing rendering successfully
         */
        renderingFinished(options: VisualUpdateOptions): void;

        /**
         * Called when rendering failed with optional reason string
         */
        renderingFailed(options: VisualUpdateOptions, reason?: string): void;
    }
}

declare module powerbi.extensibility {
    export interface IVisualLicenseManager {
        getAvailableServicePlans(): IPromise<visual.LicenseInfoResult>;
        notifyLicenseRequired(notificationType: LicenseNotificationType): IPromise<boolean>;
        notifyFeatureBlocked(tooltip: string): IPromise<boolean>;
        clearLicenseNotification(): IPromise<boolean>;
    }
}

declare module powerbi {
    /**
    * Represents a return object for exportVisualsContentExtended method
    */
    export interface ExportContentResultInfo {
        downloadCompleted: boolean;
        fileName?: string;
    }
}

declare module powerbi.extensibility {
    /** 
     * Provides functionality to save visual content as file
     */
    export interface IDownloadService {
        /**
         * Returns the availability status of the service.
         * 
         * @returns the promise that resolves to privilege status of the service
         */
        exportStatus(): IPromise<PrivilegeStatus>;

        exportVisualsContent(content: string, fileName: string, fileType: string, fileDescription: string): IPromise<boolean>;

        exportVisualsContentExtended(content: string, fileName: string, fileType: string, fileDescription: string): IPromise<ExportContentResultInfo>;
    }
}

declare module powerbi.extensibility {
    export interface IWebAccessService {
        /**
         * Returns the availability status of the service for specified url.
         * 
         * @param url - the URL to check status for
         * @returns the promise that resolves to privilege status of the service
         */
        webAccessStatus(url: string): IPromise<PrivilegeStatus>;
    }
}

declare namespace powerbi.common {
    export const enum CustomVisualHostEnv {
        Web = 1 << 0,
        PublishToWeb = 1 << 1,
        Desktop = 1 << 2,
        Embed = 1 << 3,
        ReportServer = 1 << 4,
        ExportReportHost = 1 << 5,
        Mobile = 1 << 6
    }
}

declare module powerbi {
    export interface IFilter { }
}

/**
 * Change Log Version 1.13.0
 *  Expanded `host.colorPalette` now expose a boolean `isHighContrast` flag and several non-data colors 
 *  including `foreground`, `foregroundSelected`, `background` and `hyperlink` all of which are required for high-contrast accessibility support.
 */

declare module powerbi.extensibility.visual {
    /**
     * Represents a visualization displayed within an application (PowerBI dashboards, ad-hoc reporting, etc.).
     * This interface does not make assumptions about the underlying JS/HTML constructs the visual uses to render itself.
     */
    export interface IVisual extends extensibility.IVisual {
        /** Notifies the IVisual of an update (data, viewmode, size change). */
        update<T>(options: VisualUpdateOptions, viewModel?: T): void;

        /** Notifies the visual that it is being destroyed, and to do any cleanup necessary (such as unsubscribing event handlers). */
        destroy?(): void;

        /** Gets the settings to display in the formatting pane */
        getFormattingModel?(): visuals.FormattingModel | undefined;
    }

    export interface IVisualHost extends extensibility.IVisualHost {
        createSelectionIdBuilder: () => visuals.ISelectionIdBuilder;
        createSelectionManager: () => ISelectionManager;
        colorPalette: ISandboxExtendedColorPalette;
        persistProperties: (changes: VisualObjectInstancesToPersist) => void;
        applyJsonFilter: (filter: IFilter[] | IFilter, objectName: string, propertyName: string, action: FilterAction) => void;
        tooltipService: ITooltipService;
        telemetry: ITelemetryService;
        authenticationService: IAuthenticationService;
        locale: string;
        hostCapabilities: HostCapabilities;
        launchUrl: (url: string) => void;
        fetchMoreData: (aggregateSegments?: boolean) => boolean;
        openModalDialog: (dialogId: string, options?: DialogOpenOptions, initialState?: object) => IPromise<ModalDialogResult>;
        instanceId: string;
        refreshHostData: () => void;
        createLocalizationManager: () => ILocalizationManager;
        storageService: ILocalVisualStorageService;
        downloadService: IDownloadService;
        eventService: IVisualEventService;
        switchFocusModeState: (on: boolean) => void;
        hostEnv: powerbi.common.CustomVisualHostEnv;
        displayWarningIcon: (hoverText: string, detailedText: string) => void;
        licenseManager: IVisualLicenseManager;
        webAccessService: IWebAccessService;
        drill: (args: DrillArgs) => void;
        applyCustomSort: (args: CustomVisualApplyCustomSortArgs) => void;
        storageV2Service: IVisualLocalStorageV2Service;
        acquireAADTokenService: IAcquireAADTokenService;
    }

    export interface VisualUpdateOptions extends extensibility.VisualUpdateOptions {
        viewport: IViewport;
        dataViews: DataView[];
        type: VisualUpdateType;
        viewMode?: ViewMode;
        editMode?: EditMode;
        operationKind?: VisualDataChangeOperationKind;
        jsonFilters?: IFilter[];
        isInFocus?: boolean;
    }

    export interface VisualConstructorOptions extends extensibility.VisualConstructorOptions {
        element: HTMLElement;
        host: IVisualHost;
    }

    export interface DialogConstructorOptions {
        element: HTMLElement;
        host: IDialogHost;
    }

    export interface IDialogHost {
        setResult: (resultState: object) => void;
        close: (actionId: DialogAction, resultState?: object) => void;
    }

    export interface VisualDialogPosition {
        type: VisualDialogPositionType;
        left?: number;
        top?: number;
    }

    export interface RectSize {
        width: number;
        height: number;
    }

    export interface DialogOpenOptions {
        title: string;
        size?: RectSize;
        position?: VisualDialogPosition;
        actionButtons: DialogAction[];
    }

    export interface ModalDialogResult {
        actionId: DialogAction;
        resultState: object;
    }

    export interface ServicePlan {
        spIdentifier: string;
        state: ServicePlanState;
    }

    export interface LicenseInfoResult {
        /** An array of Service Plans purchased by the active user for this visual */
        plans: ServicePlan[] | undefined;

        /** Indicates that the visual is being rendered in a Power BI environment that doesn't support licenses management or enforcement. */
        isLicenseUnsupportedEnv: boolean;

        /** Indicates whether the licenses info could be retrieved. */
        isLicenseInfoAvailable: boolean;
    }

    export interface CustomVisualApplyCustomSortArgs {
        sortDescriptors: CustomVisualSortableFieldDescriptor[];
    }

    export interface CustomVisualSortableFieldDescriptor {
        queryName: string;
        sortDirection: SortDirection;
    }
}
