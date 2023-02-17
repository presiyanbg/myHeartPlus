
const HealthCheckLogic = () => {

  const loadHeathTest = async (test_id: number | string) => {
    return {
      id: 1,
      title: "Силно главоболие",
      category: "Общи",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ducimus, repudiandae harum suscipit laboriosam amet odit impedit commodi dignissimos officiis qui obcaecati aperiam fugiat ipsam? Incidunt temporibus pariatur officiis laboriosam!",
      rating: 10.0,
    }
  }

  const loadHeathTestQA = async (test_id: number | string) => {
    return {
      questions: [
        {
          id: 1,
          title: 'Как се чувствате ?',
          final_question: false,
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to ma",
          answers: [
            {
              id: 1,
              question_id: 1,
              next_question_id: 3,
              prev_question_id: 0,
              text: 'Добре',
              points: 10,
            },
            {
              id: 2,
              question_id: 1,
              next_question_id: 2,
              prev_question_id: 0,
              text: 'Зле',
              points: 0,
            },
            {
              id: 3,
              question_id: 1,
              next_question_id: 2,
              prev_question_id: 0,
              text: 'Средно',
              points: 5,
            },
          ]
        },
        {
          id: 2,
          title: 'Как се чувствате 2 ?',
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to ma",
          final_question: false,
          answers: [
            {
              id: 1,
              question_id: 2,
              next_question_id: 3,
              prev_question_id: 1,
              text: 'Добре',
              points: 10,
            },
            {
              id: 2,
              question_id: 2,
              next_question_id: 3,
              prev_question_id: 1,
              text: 'Зле',
              points: 0,
            },
            {
              id: 3,
              question_id: 2,
              next_question_id: 3,
              prev_question_id: 1,
              text: 'Средно',
              points: 5,
            },
          ]
        },
        {
          id: 3,
          title: 'Как се чувствате 3 ?',
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to ma",
          final_question: true,
          answers: [
            {
              id: 1,
              question_id: 3,
              next_question_id: 4,
              prev_question_id: 2,
              text: 'Добре',
              points: 10,
            },
            {
              id: 2,
              question_id: 3,
              next_question_id: 4,
              prev_question_id: 2,
              text: 'Зле',
              points: 0,
            },
            {
              id: 3,
              question_id: 3,
              next_question_id: 4,
              prev_question_id: 2,
              text: 'Средно',
              points: 5,
            },
          ]
        }
      ],

    }
  }

  const saveResult = (data: any) => {

  }

  return {
    loadHeathTest,
    loadHeathTestQA,
    saveResult
  }

}

export default HealthCheckLogic;