import PaginationServices from "../../../services/paginationServices/paginationServices"

const CustomSelectLogic = () => {

  const paginationServices = PaginationServices();

  const loadData = async (url: string, page: number) => {
    const data = await paginationServices.load(url, page);

    return data;
  }

  return {
    loadData,
  }
}

export default CustomSelectLogic;