/**
 * Base page layout 
 *  
 * @param children React.ReactNode
 * @returns React.ReactNode
 */
export default async function PageLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <div className="md:w-34 bg-white w-screen lg:w-10/12 xl:w-8/12 mx-auto mt-10 mb-7 lg:rounded-lg p-3">
            {children}
        </div>
    )
}