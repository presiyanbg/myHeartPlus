import { useState } from "react"
import { useTranslation } from "react-i18next";

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

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!props.submitTest || !testFormData) return;

    props.submitTest(testFormData);
  }

  const handleInputChange = (inputType: string, event: React.FormEvent<HTMLInputElement>) => {
    if (!inputType || !event?.currentTarget?.value) return;

    setTestFormData((prev: any) => {
      prev[inputType] = event?.currentTarget?.value;

      // Update parent data
      props.submitTest(prev);

      return prev;
    });
  }

  return (
    <form onSubmit={handleSubmit}>
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
          <div className="form-floating">
            <select id="doctor_id"
              className="form-select form-select-lg"
              aria-label="doctor_id">
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>

            <label htmlFor="doctor_id">{t('Category')}</label>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-6">
          <div className="form-floating">
            <textarea
              className="form-control"
              id="description"
              placeholder="Description"
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