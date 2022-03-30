/**
 * @tsoaModel
 */
export type Many<TModel> = ReadonlyArray<TModel> & Pick<Array<TModel>, "sort">;
