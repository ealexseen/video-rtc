import {useState, useEffect, useRef} from 'react';
import socket from '../../socket';
import ACTIONS from '../../socket/actions';
import {useHistory} from 'react-router';
import {v4} from 'uuid';

export default function Main() {
  const history = useHistory();
  const [rooms, updateRooms] = useState([]);
  const rootNode = useRef();

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({rooms = []} = {}) => {
      if (rootNode.current) {
        updateRooms(rooms);
      }
    });
  }, []);

  return (
    <div ref={rootNode} className="main">
      <h1>
          {rooms.length ? 'Выбор комнату(ы)' : 'Создайте комнату'}
      </h1>

      <ul className="main__list">
        {rooms.map(roomID => (
          <li key={roomID} className="main__item">
            <span>
                Комната № {roomID}
            </span>
            <button
                className="button"
                onClick={() => {
                  history.push(`/room/${roomID}`);
                }}
            >
                Зайти в комнату
            </button>
          </li>
        ))}
      </ul>

      <button
          className="button"
          onClick={() => {
            history.push(`/room/${v4()}`);
          }}
      >
          Создать новую комнату
      </button>
    </div>
  );
}
