import { BrowsePageState } from 'app/containers/BrowsePage/types';
import { DetailsPageState } from 'app/containers/DetailsPage/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  browsePage?: BrowsePageState;
  detailsPage?: DetailsPageState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
