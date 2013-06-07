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
}
