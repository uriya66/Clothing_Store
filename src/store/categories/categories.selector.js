import { createSelector } from "reselect";

// initial selector that gives back just that slice of the reducer we need which is the categories reducer
const selectCategoriesReducer = (state) => state.categories;

/*
 this is a memorized selector.
 the only time where this "  (categoriesSlice) => categoriesSlice.categories" will run
 if the categoriesSlice object that we get back from the selectCategoriesReducer selector is different just then reselect determine to re-run this method
*/
export const selectCategories = createSelector(
  // an array of input selectors - a slice of categories reducer
  [selectCategoriesReducer],
  // categoriesSlice will receive as the argument inside of the output array
  // and for categoriesSlice get off the categories value
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  // as long as the categories array does not change, do not rerun the reduce
  [selectCategories],
  // categories array
  (categories) =>
    // reduce to create the structure fit
    categories.reduce(
      // the callback that invoked on each document snapshot
      (accumulator, category) => {
        // the values of the data of this documentSnapshot
        const { title, items } = category;
        accumulator[title.toLowerCase()] = items;
        return accumulator;
      },
      // the final object that created
      {}
    )
);
