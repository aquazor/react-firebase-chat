import { Dropdown } from '../ui';

const Settings = () => {
  return (
    <div className="scroll-default flex flex-1 flex-col overflow-auto">
      <div className="flex flex-1 flex-col gap-4 p-5">
        <Dropdown title="Chat settings">
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
              non, nulla aperiam repudianda
            </p>
          </div>
        </Dropdown>

        <Dropdown title="Chat settings">
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
              non, nulla aperiam repudiandae mollitia repellendus architecto,
              perferendis quod quaerat modi at sequi est dolorem vel facilis
              doloremque, excepturi beatae laborum.
            </p>
          </div>
        </Dropdown>

        <Dropdown title="Chat settings">
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
              non, nulla apei at sequi est dolorem vel facilis doloremque,
              excepturi beatae laborum.
            </p>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Settings;
