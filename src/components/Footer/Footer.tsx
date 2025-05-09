import { useCallback, useContext } from 'react';
import classNames from 'classnames';

import { Filter } from '../../types/Filter';
import { DispatchContext, StateContext } from '../../Store';

export const Footer = () => {
  const dispatch = useContext(DispatchContext);

  const {
    filter: currentFilter,
    activeCount,
    formField,
    todos,
  } = useContext(StateContext);

  const deleteCompleted = useCallback(() => {
    dispatch({ type: 'deleteCompleted' });
    formField.current?.focus();
  }, [dispatch, formField]);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">{activeCount} items left</span>

      <nav className="filter">
        {Object.values(Filter).map(filter => (
          <a
            key={filter}
            href="#/"
            className={classNames('filter__link', {
              selected: currentFilter === filter,
            })}
            onClick={() => dispatch({ type: 'changeFilter', payload: filter })}
          >
            {filter}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={activeCount === todos.length}
        onClick={deleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
