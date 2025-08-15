import Link from 'next/link';
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
                <Link href={crumb.url} key={uuid()}>
                    {crumb.title}
                    <span className="me-1 ms-1 text-2xl font-light">/</span>
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
                    <h4 className="text-2xl font-light capitalize">
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