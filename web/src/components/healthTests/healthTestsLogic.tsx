
const HealthTestsLogic = () => {
  const loadDoctorTestsPreview = async (doctor_id: number) => {
    return [
      {
        id: 1,
        title: "Силно главоболие",
        category: "Общи",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ducimus, repudiandae harum suscipit laboriosam amet odit impedit commodi dignissimos officiis qui obcaecati aperiam fugiat ipsam? Incidunt temporibus pariatur officiis laboriosam!",
        rating: 10.0,
      },
      {
        id: 2,
        title: "Силно главоболие",
        category: "Общи",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ducimus, repudiandae harum suscipit laboriosam amet odit impedit commodi dignissimos officiis qui obcaecati aperiam fugiat ipsam? Incidunt temporibus pariatur officiis laboriosam!",
        rating: 10.0,
      },
      {
        id: 3,
        title: "Силно главоболие",
        category: "Общи",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ducimus, repudiandae harum suscipit laboriosam amet odit impedit commodi dignissimos officiis qui obcaecati aperiam fugiat ipsam? Incidunt temporibus pariatur officiis laboriosam!",
        rating: 10.0,
      }
    ];
  }

  return {
    loadDoctorTestsPreview,
  }
}

export default HealthTestsLogic;