import s from "./AddPages.module.scss";
import spriteSvg from "assets/images/sprite.svg";
import { schema } from "assets/schemas/addPagesValidation";
import Button from "components/Button";
import { useAddPageMutation } from "redux/api/bookAPI";

import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePickerField from "components/DatePickerField";
import dayjs from "dayjs";

const AddPages = (props) => {
  const { data } = props;

  const [addPage] = useAddPageMutation();

  const onSubmit = (values) => {
    addPage(values);
  };

  return (
    <Formik
      initialValues={{ date: new Date(), pages: "" }}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      {({ values, handleSubmit, handleChange, isValid, dirty }) => (
        <Form onSubmit={handleSubmit} className={s.form}>
          <h2 className={s.title}>Result</h2>
          <div className={s.wrapper}>
            <div className={s.fieldWrapper}>
              <p className={s.name}>Date</p>
              <DatePickerField
                className={s.date}
                name="date"
                maxDate={new Date()}
                dateFormat="MM.dd.yyyy"
                closeOnScroll={true}
                value={values.date}
                onChange={handleChange}
              />
              <svg className={s.iconSvg} style={{ width: "24px" }}>
                <use href={`${spriteSvg}#icon-polygon`}></use>
              </svg>
            </div>
            <div className={s.fieldWrapper}>
              <p className={s.name}>Amount of pages</p>
              <Field className={s.input} type="number" name="pages" />
              <span className={s.error}>
                <ErrorMessage name="pages" />
              </span>
            </div>
          </div>
          <Button
            disabled={!isValid && !dirty}
            type="submit"
            className={s.button}
            text="Add result"
          />
          <h2 className={s.statisticsTitle}>STATISTICS</h2>
          {data?.data && (
            <ul className={s.statistics}>
              {data.data
                .slice(0)
                .reverse()
                .map(({ _id: id, pages, date }) => (
                  <li className={s.item} key={id}>
                    <span className={s.day}>
                      {dayjs(date).format("DD.MM.YYYY")}
                    </span>
                    <span className={s.data}>
                      {dayjs(date).format("HH:mm:ss")}
                    </span>
                    <span className={s.pages}>{pages} pages</span>
                  </li>
                ))}
            </ul>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default AddPages;
