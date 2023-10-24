import CommentsLogic from "./commentsLogic"

import { useEffect } from "react"

type Props = {
    parentUrl: string,
    parentId?: string | number
}

const Comments = (props: Props) => {
    const logic = CommentsLogic();

    useEffect(() => {
        logic.loadComments()
    }, [])

    return (
        <div className="box-wrapper">
            <div className="box">
                <div className="box__head">
                    <div className="box__title">
                        <h3>
                            Comments
                        </h3>
                    </div>
                </div>
                <div className="box__body">
                    {logic.getComments()}
                </div>
            </div>
        </div>
    )

}

export default Comments;