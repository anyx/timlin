<?php

namespace App\Repository;

use Doctrine\ODM\MongoDB\DocumentRepository as BaseRepository;

/**
 * 
 */
class DocumentRepository extends BaseRepository
{
    public function findUserDocumentById($user, $documentId)
    {
        return $this->findOneById($documentId);
    }
    
    /**
     * 
     * @param integer $limit
     * @return \Doctrine\ODM\MongoDB\LoggableCursor
     */
    public function getPopularDocuments($limit = 10)
    {
        return $this->findBy(
            array(
                //'published' => true
            ), 
            array(
                
            ),
            $limit
        );
    }
    
    public function getPublicDocument($id)
    {
        return $this->findOneBy(
            array(
                'id'    => $id
            )
        );
    }
}
