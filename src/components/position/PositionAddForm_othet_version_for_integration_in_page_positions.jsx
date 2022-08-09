import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PositionAddForm_othet_version_for_integration_in_page_positions = () => {
    return (
        <div>
            <a className="btn btn-primary mb-3" data-toggle="collapse" href="#collapseExample" role="button"
               aria-expanded="true"
               aria-controls="collapseExample">
                Добавить новую должность
            </a>
            <div class="collapse" id="collapseExample">
                <div class="form-group mt-3">
                    <form method="post" enctype="multipart/form-data">

                        <div class="form-group">
                            <input type="text" class="form-control" name="name"
                                   placeholder="Введите название должности"/>
                        </div>

                        <div class="form-group">
                            <select class="form-control" id="exampleFormControlSelect1" name="departmentId">
                                <option value="">55555</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <input type="text"
                                   class="form-control"
                                   name="subordinationLevel"
                                   placeholder="Введите уровнь субординации (целое число, 1 самая высокая)"/>
                        </div>

                        <div class="form-group">
                            <input type="text"
                                   class="form-control"
                                   name="description"
                                   placeholder="Введите описание должности"/>
                        </div>


                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">добавить должность</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PositionAddForm_othet_version_for_integration_in_page_positions;