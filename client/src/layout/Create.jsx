import React, {useState} from "react";
import { IconPlusCircle } from "@arco-design/web-react/icon";
import { Modal, Menu} from "@arco-design/web-react";
import CreateForm from "../components/CreateForm";

const MenuItem = Menu.Item;



function Create({handleAddEvent}) {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    

    return (
        <div>
            <MenuItem 
                key='3'
                onClick={ () => {
                    setVisible(true)
                }}>
                <IconPlusCircle/>
                Create
            </MenuItem>
            <Modal
                title='Add Event'
                visible={visible}
                onCancel={() => {
                    setVisible(false);
                  }}          
                confirmLoading={confirmLoading}
                footer={null}
          
            >
                <CreateForm handleAddEvent={handleAddEvent} setVisible={setVisible} visible={visible}/>
            </Modal>
        </div>
    )
}

export default Create;


