/**
 * @tsoaModel
 */
export type Many<TModel> = ReadonlyArray<TModel> & Partial<Pick<Array<TModel>, "sort">>;
