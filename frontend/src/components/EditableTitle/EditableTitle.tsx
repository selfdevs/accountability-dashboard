import React, { useCallback, useEffect, useRef, useState } from 'react';
import { faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';
import _ from 'lodash';
import { request } from '../../modules/http/client';

const EditableTitle = ({ title }) => {
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef(null);
  const [newTitle, setNewTitle] = useState(null);

  const edit = useCallback(() => {
    setEditMode((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      request('/user', 'PATCH', { dashboardTitle: newTitle }).catch(_.noop);
      setEditMode(false);
    },
    [newTitle]
  );

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  return (
    <form
      className={`editable-title-container ${
        editMode ? 'editable-title-container-edit' : ''
      }`}
      onSubmit={handleSubmit}
    >
      {editMode ? (
        <input
          type="text"
          ref={inputRef}
          value={newTitle}
          onBlur={handleSubmit}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      ) : (
        <h1>{newTitle}</h1>
      )}
      <FontAwesomeIcon
        icon={editMode ? faCheck : faPen}
        onClick={editMode ? handleSubmit : edit}
      />
    </form>
  );
};

export default EditableTitle;
