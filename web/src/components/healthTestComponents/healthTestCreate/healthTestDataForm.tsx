import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import CustomSelect from "../../commonComponents/customSelect/customSelect";
import { v4 as uuid } from "uuid";
import { HealthCategoryType } from "../../../ts/types";

type Props = {
  submitTest: (data: any) => void
}

const HealthTestDataForm = (props: Props) => {
  const [testFormData, setTestFormData] = useState<any>({
    title: '',
    description: '',
    category_id: ''
  });

  const { t } = useTranslation();

  const handleInputChange = (inputType: string, event: React.FormEvent<any>) => {
    if (!inputType || !event?.currentTarget?.value) return;

    setTestFormData((prev: any) => {
      prev[inputType] = event?.currentTarget?.value;

      return prev;
    });

    // Send test data to parent component 
    if (!props.submitTest) return;

    props.submitTest(testFormData);
  }

  const handleCategoryChange = (category: HealthCategoryType) => {
    if (!category?.id) return;

    setTestFormData((prev: any) => {
      prev.category = category;

      return prev;
    });

    // Send test data to parent component 
    if (!props.submitTest) return;

    props.submitTest(testFormData);
  }

  return (
    <form>
      <div className="row justify-content-center mb-4">
        <div className="col-6">
          <div className="form-floating">
            <input type="text"
              className="form-control"
              id="title"
              placeholder="Title"
              onChange={(e) => handleInputChange('title', e)} />

            <label htmlFor="exampleInputPassword1">{t('Title')}</label>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-6">
          <CustomSelect
            id={uuid()}
            url={'health-category'}
            displayKey="title"
            label={t('Category')}
            submitData={handleCategoryChange}></CustomSelect>
        </div>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-6">
          <div className="form-floating">
            <textarea
              className="form-control"
              id="description"
              placeholder="Description"
              onChange={(e) => handleInputChange('description', e)}
              maxLength={2024}
            />

            <label htmlFor="exampleInputPassword1">{t('Description')}</label>
          </div>
        </div>
      </div>
    </form>
  )
}

export default HealthTestDataForm;