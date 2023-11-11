import { Link } from "react-router-dom"
import { v4 as uuid } from 'uuid';

type Props = {

  // Main title of page
  title: string,

  // Breadcrumbs array 
  breadCrumbs?: {
    title: string,
    url: string
  }[]

  // Search
  search?: boolean,
  searchFunction?: (data: string) => {}
}

const PageTitle = (props: Props) => {
  let breadCrumbs;
  let search;

  // Build breadcrumbs 
  if (props.breadCrumbs?.length) {
    breadCrumbs = props.breadCrumbs.map(crumb => {
      return (
        <Link to={crumb.url} key={uuid()}>
          {crumb.title}
          <span className="me-1 ms-1">/</span>
        </Link >
      )
    })
  }

  // Display search only wheen needed
  if (props.search && typeof props.searchFunction == 'function') {
    search = (
      <div className="col-sm-12 col-md-6">
        Search
      </div>
    )
  }

  return (
    <div className="page--title">
      <div className="row w-100">
        {/* Page title and breadcrumbs */}
        <div className="col-sm-12 col-md-6">
          <h4>
            {breadCrumbs}
            {props.title}
          </h4>
        </div>

        {/* Search */}
        {search}
      </div>
    </div>
  )
}

export default PageTitle;