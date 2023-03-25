import { useEffect, useState } from "react";
import CustomSelectLogic from "./customSelectLogic";
import { v4 as uuid } from "uuid";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { PaginationType } from "../../../ts/types";
import { useTranslation } from "react-i18next";
import { arrayFilterUnique } from "../../../utils/utils";

type Props = {
  id: string,
  url: string,
  label: string,
  displayKey: string,
  submitData: (data: any) => void,
}

const CustomSelect = (props: Props) => {
  const id = props.id;
  const [searchText, setSearchText] = useState<string>('');
  const [listOpen, setListOpen] = useState<boolean>(false);
  const [listData, setListData] = useState<any>([]);
  const [paginatedData, setPaginatedData] = useState<PaginationType>();

  const { t } = useTranslation();

  const logic = CustomSelectLogic();

  const loadListData = () => {
    if (!!paginatedData?.to && paginatedData?.to == paginatedData?.total) return;

    const pageToLoad = paginatedData?.to || 0;

    logic.loadData(props?.url, pageToLoad).then((response: any) => {
      const pagination: PaginationType | any = Object.values(response)[0];

      if (pagination?.data && pagination?.current_page > 0) {
        setPaginatedData(pagination);

        setListData((prev: any) => {
          return arrayFilterUnique([].concat(prev, pagination.data), 'id');
        });
      }
    })
  }

  const selectRow = (data: any) => {
    if (!data || !props?.submitData) return;

    setSearchText(data[props?.displayKey]);

    props.submitData(data);
  }

  /**
   * 
   * @todo: Prevent list hiding if click is in parent component 
   * 
   * @param toggle 
   */
  const toggleListOpen = (toggle: boolean) => {
    setTimeout(() => {
      setListOpen(toggle);
    }, 100);
  }

  const handleSearch = (event: React.FormEvent<any>) => {
    const searchValue = event?.currentTarget?.value;

    setSearchText(searchValue);

    // Reset list 
    if (!searchValue?.length && paginatedData?.data?.length) {
      setListData(paginatedData?.data);
    }

    if (searchValue?.length > 0 && paginatedData?.data?.length) {
      setListData(() => {
        const searchList = paginatedData.data.filter((row: any) => {
          if (!row[props?.displayKey]?.length) return false;

          return row[props?.displayKey]?.toLowerCase()?.includes(searchValue.toLowerCase());
        });

        const noResultsFound: any = {
          [props.displayKey]: t('No results found')
        };

        if (searchList?.length) {
          return searchList;
        }

        return [noResultsFound];
      });
    }
  }

  useEffect(() => {
    if (!props?.url || !props?.label || !props?.submitData) return;

    loadListData();
  }, [props?.url])

  if (!props?.url || !props?.label || !props?.submitData) return (<></>);

  return (
    <div className="custom-select" key={id} onBlur={() => toggleListOpen(false)}>
      <div className="form-floating custom-select--input">
        <input type="text"
          className="form-control"
          placeholder={props?.label}
          value={searchText}
          onChange={handleSearch}
          onFocus={() => toggleListOpen(true)} />

        <label htmlFor="exampleInputPassword1">{props?.label}</label>

        <div className="custom-select--input-icon">
          <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
        </div>


      </div>

      <div className="custom-select--list">
        {
          listOpen && !!listData?.length && (
            <ul className="list-group list-group-flush">
              {
                listData.map((row: any) => {
                  return (
                    <li key={uuid()}
                      className="list-group-item"
                      onClick={() => selectRow(row)}>
                      {row[props?.displayKey]}
                    </li>
                  )
                })
              }
            </ul>
          )
        }
      </div>
    </div>
  );
}

export default CustomSelect;