<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\MappedSuperclass
 */
abstract class AbstractContent
{
    /**
     * @MongoDB\Id
     */
    protected $id;

    /**
     * @MongoDB\ReferenceOne(targetDocument="AbstractDocument")
     */
    protected $parent;

    /**
     * 
     * @param \App\Document\AbstractContent $parent
     */
    public function __construct(AbstractContent $parent = null)
    {
        $this->id = new \MongoId();
        if (!empty($parent)) {
            $this->parent = $parent;
        }
    }
}
