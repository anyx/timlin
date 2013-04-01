<?php

namespace App\Controller;

class IndexController
{
    public function indexAction()
    {
        return [];
    }

    public function editAction($id)
    {
        return [
            'id'    => $id
        ];
    }
}
