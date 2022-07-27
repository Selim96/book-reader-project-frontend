import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { isAuth } from "redux/auth";
import { useBooksQuery, useDeleteBookMutation } from "redux/api/bookAPI";
import { useToggle } from "hooks";
import useTranslation from "hooks/useTranslation";
import { ModalBookReview, ModalRemoveBook } from "components/Modals";

import Loader from "components/Loader";
import TitleRead from "./TitleRead/TitleRead";
import TitleReading from "./TitleReading/TitleReading";
import Rating from "components/Rating";
import Button from "components/Button";

import spriteSvg from "assets/images/sprite.svg";
import s from "./BookListLibrary.module.scss";

export default function BookListLibrary() {
  const [book, setBook] = useState("");
  const [removeModal, setRemoveModal] = useState(false);
  const [id, setId] = useState("");
  const [openModal, toggleModal] = useToggle();
  const auth = useSelector(isAuth);
  const { data = [], isFetching } = useBooksQuery(null, { skip: !auth });
  const [deleteBook] = useDeleteBookMutation();
  const { t } = useTranslation("BookListLibrary");
  const navigate = useNavigate();

  if (isFetching) return <Loader />;

  const status = (e) => {
    const status = data.some((item) => item.status === e);
    return status;
  };
  return (
    <section className={s.librarySection}>
      {status("read") && (
        <div className={s.booksWrapper}>
          <h2 className={s.booksTitle}>{t.read}</h2>
          <TitleRead />
          <ul className={s.readList}>
            {data.map(
              (item) =>
                item.status === "read" && (
                  <li key={item._id} className={s.readItem}>
                    <ul className={s.readBookList}>
                      <li className={s.readBookItem}>
                        <svg className={s.readBookIcon}>
                          <use href={`${spriteSvg}#icon-read`} />
                        </svg>
                        <p className={s.readBookItemTitle}>{item.title}</p>
                      </li>
                      <li className={s.readBookItem}>
                        <span className={s.readBookItemCategory}>
                          {t.author}:
                        </span>
                        <p className={s.readBookItemText}>{item.author}</p>
                      </li>
                      <li className={s.readBookItem}>
                        <span className={s.readBookItemCategory}>
                          {t.year}:
                        </span>
                        <p className={s.readBookItemText}>{item.year}</p>
                      </li>
                      <li className={s.readBookItem}>
                        <span className={s.readBookItemCategory}>
                          {t.pages}:
                        </span>
                        <p className={s.readBookItemText}>{item.pages}</p>
                      </li>
                      <li className={s.readBookItem}>
                        <span className={s.readBookItemCategory}>
                          {t.rating}:
                        </span>
                        <Rating mark={item.rating} />
                      </li>
                      <li>
                        <Button
                          onClick={() => {
                            setBook(item);
                            toggleModal();
                          }}
                          className={s.readBookButton}
                          styleType="secondary"
                          text={t.resume}
                        />
                      </li>
                    </ul>
                  </li>
                )
            )}
          </ul>
        </div>
      )}

      {status("reading") && (
        <div className={s.booksWrapper}>
          <h2 className={s.booksTitle}>{t.reading}</h2>
          <TitleReading />
          <ul className={s.readingList}>
            {data.map(
              (item) =>
                item.status === "reading" && (
                  <li key={item._id} className={s.readingItem}>
                    <ul className={s.readingBookList}>
                      <li className={s.readingBookItem}>
                        <svg className={s.readingBookIcon}>
                          <use href={`${spriteSvg}#icon-reading`} />
                        </svg>
                        <p className={s.readingBookItemTitle}>{item.title}</p>
                      </li>
                      <li className={s.readingBookItem}>
                        <span className={s.readingBookItemCategory}>
                          {t.author}:
                        </span>
                        <p className={s.readingBookItemText}>{item.author}</p>
                      </li>
                      <li className={s.readingBookItem}>
                        <span className={s.readingBookItemCategory}>
                          {t.year}:
                        </span>
                        <span className={s.readingBookItemText}>
                          {item.year}
                        </span>
                      </li>
                      <li className={s.readingBookItem}>
                        <span className={s.readingBookItemCategory}>
                          {t.pages}:
                        </span>
                        <span className={s.readingBookItemText}>
                          {item.pages}
                        </span>
                      </li>
                    </ul>
                  </li>
                )
            )}
          </ul>
        </div>
      )}
      {status("goingToRead") && (
        <div className={s.booksWrapper}>
          <h2 className={s.booksTitle}>{t.going}</h2>
          <TitleReading />
          <ul className={s.goingToReadList}>
            {data.map(
              (item) =>
                item.status === "goingToRead" && (
                  <li key={item._id} className={s.goingToReadItem}>
                    <ul className={s.goingToReadBookList}>
                      <li className={s.goingToReadBookItem}>
                        <svg className={s.goingToReadBookIcon}>
                          <use href={`${spriteSvg}#icon-flat`} />
                        </svg>
                        <p className={s.goingToReadBookTitle}>{item.title}</p>
                      </li>
                      <li className={s.goingToReadBookItem}>
                        <span className={s.goingToReadBookItemCategory}>
                          {t.author}:
                        </span>
                        <p className={s.goingToReadBookItemText}>
                          {item.author}
                        </p>
                      </li>
                      <li className={s.goingToReadBookItem}>
                        <span className={s.goingToReadBookItemCategory}>
                          {t.year}:
                        </span>
                        <span className={s.goingToReadBookItemText}>
                          {item.year}
                        </span>
                      </li>
                      <li className={s.goingToReadBookItem}>
                        <span className={s.goingToReadBookItemCategory}>
                          {t.pages}:
                        </span>
                        <span className={s.goingToReadBookItemText}>
                          {item.pages}
                        </span>
                      </li>
                    </ul>
                    <svg
                      className={s.deleteIcon}
                      onClick={() => {
                        setId(item._id);
                        setRemoveModal(true);
                      }}
                    >
                      <use href={`${spriteSvg}#icon-delete`} />
                    </svg>
                  </li>
                )
            )}
          </ul>
        </div>
      )}
      {
        <ModalRemoveBook
          open={removeModal}
          onClose={() => {
            setRemoveModal(false);
          }}
          continueFunc={async () => {
            try {
              await deleteBook(id).unwrap();
              toast.success(t.success);
            } catch (error) {
              toast.error(t.error);
            }
          }}
        />
      }
      {book && (
        <ModalBookReview book={book} open={openModal} onClose={toggleModal} />
      )}
      {data.length > 0 && (
        <Button
          className={s.link}
          text={t.training}
          onClick={() => navigate("/training")}
        />
      )}
    </section>
  );
}
