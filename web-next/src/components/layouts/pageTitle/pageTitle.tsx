'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { v4 as uuid } from 'uuid';

type Props = {
    // Main title of page
    title: string,

    // Breadcrumbs array 
    breadCrumbs?: {
        title: string,
        url: string
    }[]

    // When not to try to translate a word  
    toTranslation?: boolean,

    // Search
    search?: boolean,
    searchFunction?: (data: string) => {}
}

const PageTitle = (props: Props) => {
    const t = useTranslations();
    let breadCrumbs;
    let search;

    // Build breadcrumbs 
    if (props.breadCrumbs?.length) {
        breadCrumbs = props.breadCrumbs.map(crumb => {
            return (
                <Link href={crumb.url} key={uuid()}>
                    {!props?.toTranslation ? t(crumb.title) : crumb.title}
                    <span className="me-1 ms-1 font-bold">/</span>
                </Link >
            )
        })
    }

    // Display search only wheen needed
    if (props.search && typeof props.searchFunction == 'function') {
        search = (
            <div className="col-sm-12 col-md-6">
                {t('Search')}
            </div>
        )
    }

    return (
        <div>
            <div className="row w-100">
                {/* Page title and breadcrumbs */}
                <div>
                    <span className="text-blue-600">
                        {breadCrumbs}
                    </span>

                    <span className="text-bold">
                        {props.title}
                    </span>
                </div>

                {/* Search */}
                {search}
            </div>
        </div>
    )
}

export default PageTitle;