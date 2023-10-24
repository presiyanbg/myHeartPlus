
import { useState, useEffect } from "react"

const CommentsLogic = () => {
    const [comments, setComments] = useState();

    const loadComments = async () => {

    }

    const getComments = () => {
        return (
            <div className="comments-wrapper">
                <div className="comment">
                    <div className="comment__head">
                        <div className="profile-picture">
                            <div className="comment-user__icon">
                                <img src="http://localhost:8000/images/users/user-photo__1.jpg" alt="User photo" />
                            </div>
                        </div>
                    </div>

                    <div className="comment__body">
                        <div className="comment__content">
                            <p className="mb-0">Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos maiores vitae laborum minus nobis doloribus in, animi dicta reiciendis aperiam quod excepturi eos aspernatur sint! Ad in aliquid consequatur harum. sit, amet consectetur adipisicing elit. Voluptatibus vitae quis ea. Totam nulla, harum nam </p>
                        </div>

                        <div className="comment__reply">
                            <span>Reply</span>
                        </div>
                    </div>

                    <div className="comment--footer">

                    </div>
                </div>
            </div>
        )
    }

    return {
        loadComments,
        getComments,
    }
}

export default CommentsLogic;