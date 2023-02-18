import { useEffect } from "react"
import CommentsLogic from "./commentsLogic"

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
        <div className="box--head">
          <div className="box--title">
            <h3>
              Comments
            </h3>
          </div>
        </div>
        <div className="box--body">
          {logic.getComments()}
        </div>
      </div>
    </div>
  )

}

export default Comments;